import React from 'react';
import { Doughnut } from 'react-chartjs-2';

// eslint-disable-next-line object-curly-newline
import { ArcElement, Chart, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface GraphProps {
  ratio: number[];
}

export default function InvestGraph({ ratio } : GraphProps) {
  const chartData = {
    labels: ['위험형', '중립형', '안전형'],
    datasets: [
      {
        data: ratio,
        backgroundColor: ['#392727', '#FAC152', '#50867C'],
        cutout: '50%',
      },
    ],
  };

  const chartOptions = {
    events: [],
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: {
        position: 'right' as const,
        display: false,
        labels: {
          color: '#1C1C1C',
          boxWidth: 24,
          font: {
            size: 24,
            weight: '600',
          },
        },
      },
    },
  };

  return (
    <Doughnut data={chartData} width="150px" height="150px" options={chartOptions} />
  );
}
