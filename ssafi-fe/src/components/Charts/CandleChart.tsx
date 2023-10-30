import React from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type CandleData = {
  x: string; // 시간이나 날짜
  y: [number, number, number, number]; // [시가, 최고가, 최저가, 종가] 순서
};

type CandleChartProps = {
  data: CandleData[];
};

const CandleChart: React.FC<CandleChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 500,
      width: 500,
      toolbar: {
        tools: {},
      },
      background: 'transparent',
    },
    grid: {
      show: false,
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        },
        colors: {
          upward: 'var(--upper-color)',
          downward: 'var(--lower-color)',
        },
      },
    },
    xaxis: {
      type: 'category',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        formatter: (value) => {
          const date = new Date(value);
          return `${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes(),
          ).padStart(2, '0')}`;
        },
      },
    },
  };

  const series = [
    {
      data: data.map((price) => ({
        x: price.x,
        y: price.y,
      })),
    },
  ];

  return (
    <ApexCharts
      options={options}
      series={series}
      type="candlestick"
      width={800}
      height={400}
    />
  );
};

export default CandleChart;
