    // storage.js
    
const storage = {
    save(key, data) {
          try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
          } catch (error) {
            console.error('Error saving to local storage:', error);
          }
        },
      
    load(key) {
          try {
            const serializedData = localStorage.getItem(key);
            return serializedData ? JSON.parse(serializedData) : null;
          } catch (error) {
            console.error('Error loading from local storage:', error);
            return null;
          }
        },
      
    remove(key) {
            localStorage.removeItem(key);
        },
      
    clear() {
            localStorage.clear();
        }
      };
      
      export default storage;