import { Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dailychart = () => {
  const data = {
    labels: { display: false },
    datasets: [
      {
        data: [30, 70], //sample data
        backgroundColor: [ '#82C45C', '#28B6F6'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default Dailychart;