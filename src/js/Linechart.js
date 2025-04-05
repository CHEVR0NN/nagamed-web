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
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  datasets: [
    {
      label: 'Patients',
      data: [100, 500, 150, 600, 250, 1000, 500, 150, 700, 250, 900, 50], //sample data lang 
      borderColor: '#962DFF',
      tension: 0.4,
      pointRadius: 0,
      tension: 0,

    },
    {
      label: 'Consultation',
      data: [50, 500, 75, 200, 180, 800, 200, 850, 10, 1000, 300, 700],
      borderColor: '#FCB5C3',
      tension: 0.4,
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
          stepSize: 250,
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
  

export default function LineChart() {
  return (
    <div style={{ width: '100%', height: '100%'}}>
      <Line data={data} options={options} />
    </div>
  );
}
