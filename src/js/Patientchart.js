import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
);

const data = {
  labels: [
    '00', '25', '50', '75', '100',
  ],
  datasets: [
    {
      label: 'Patient Count',
      data: [15, 21, 12, 20, 16], //sample data lang 
      borderColor: '#C084FC',
      pointRadius: 0,
      tension: 0,

    },
    {
      label: 'Appointment Pending',
      data: [10, 20, 10, 11, 15], //sample data lang 
      borderColor: '#FB923C',
      pointRadius: 0,
      tension: 0,
    },
    {
        label: 'Appoinment Decline',
        data: [5, 12, 2, 8, 5], //sample data lang 
        borderColor: '#2563EB',
        pointRadius: 0,
        tension: 0,
  
      },
      {
        label: 'Appointment Finished',
        data: [5, 8, 10, 11, 15], //sample data lang 
        borderColor: '#22C55E',
        pointRadius: 0,
        tension: 0,
      },
  ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 25,
          callback: function (value) {
          return value.toLocaleString();
          },
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        },
      },
  };
  

export default function Patientchart() {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
