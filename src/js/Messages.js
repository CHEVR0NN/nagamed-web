import React, { useState, useEffect } from "react";
import "../css/Messages.css";
import { PersonAddAltOutlined, SearchOutlined, PeopleAlt, NotesOutlined } from "@mui/icons-material";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ["websocket", "polling"], // Ensure compatibility
});

const dummyPeople = [
  { name: "Dr. Smith", role: "doctor", id: "doctor" },
  { name: "John Doe", role: "patient", id: "patient" },
];

const dummyMessages = [
  { sender: "patient", text: "Hello, Doctor! I have a question about my medication." },
  { sender: "doctor", text: "Sure, what would you like to know?" },
  { sender: "patient", text: "Can I take it with food?" },
  { sender: "doctor", text: "Yes, you can take it with food to avoid stomach upset." },
  { sender: "patient", text: "Thank you, Doctor!" },
  { sender: "doctor", text: "You're welcome! Let me know if you have more questions." },
];

const Messages = () => {
  const [selected, setSelected] = useState(dummyPeople[0]);
  const [messages, setMessages] = useState({
    doctor: dummyMessages,
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("receive-message", (message) => {
      const newMessages = { ...messages };
      if (!newMessages[message.receiver]) {
        newMessages[message.receiver] = [];
      }
      newMessages[message.receiver].push({ sender: "other", text: message.text });
      setMessages(newMessages);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessages = { ...messages };
      if (!newMessages[selected.id]) {
        newMessages[selected.id] = [];
      }
      newMessages[selected.id].push({ sender: "doctor", text: input });
      setMessages(newMessages);
      socket.emit("send-message", { receiver: selected.id, text: input });
      setInput("");
    }
  };

  return (
    <div className="message-container">
      <div className="sidebar">
        <div className="msg-header">
          <span className="msg-header-txt"><PeopleAlt style={{ color: "#2F80ED", marginRight: 5 }} /> People</span>
          <div className="icons">
            <PersonAddAltOutlined style={{ color: "#2F80ED" }} />
            <SearchOutlined style={{ color: "#2F80ED" }} />
          </div>
        </div>
        <hr className="sidebar-hr" />
        {dummyPeople.map((p, i) => (
          <div key={i} className="person" onClick={() => setSelected(p)}>
            <span className="kausap">{p.name}</span>
            <span className={`indicator ${p.role}`}>{p.role}</span>
          </div>
        ))}
      </div>

      <div className="chat-area">
        <div className="top-bar">
          <input type="text" placeholder="Search" className="msg-search" />
          <button className="compose-btn">Compose <NotesOutlined style={{ fontSize: 15, marginLeft: 5 }} /></button>
        </div>

        <hr className="chat-hr" />
        <span className="chatmate">{selected.name}</span>
        <hr className="chat-hr" />

        <div className="chat-box">
          {messages[selected.id]?.map((m, i) => (
            <div key={i} className={`message ${m.sender === "doctor" ?  "right" : "left"}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="input-bar">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Write a message"
            className="msg-input"
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
