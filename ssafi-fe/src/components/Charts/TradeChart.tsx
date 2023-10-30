/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-else-return */
/* eslint-disable object-shorthand */
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
);

const options = {
  maxBarThickness: 40,
  maintainAspectRatio: true,
  // grouped: false,
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  // plugins: {
  //   title: {
  //     display: true,
  //     text: 'Chart.js Line Chart - Multi Axis',
  //   },
  // },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
      },
      // ticks: {
      //   display: true,
      // },
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
  },
};

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
const totalData = [200000, 190000, 210000, 210000, 200800, 200000, 188000, 195000, 205400, 205000, 210000, 210000, 200800, 200000, 188000, 195000, 205400, 205000];
const dangerData = [48200, 60020, 25500, 16070, 26000, 32000, 40500, 50020, 25500, 19070, 25500, 16070, 26000, 32000, 40500, 50020, 25500, 19070];
const middleData = [50420, 34500, 52700, 48320, 52200, 32600, 55240, 52700, 48320, 52200, 52700, 48320, 52200, 32600, 55240, 52700, 48320, 52200];
const safeData = [77000, 79000, 89000, 71020, 86000, 90000, 89080, 90000, 89080, 79000, 89000, 71020, 86000, 90000, 89080, 90000, 89080, 79000];
const profitData = [-423, 489, -193, -330, 108, -20, 110, 112, 99, 90, -193, -487, 108, -35, 60, 222, 129, 90];

export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: '전체',
      borderColor: '#325488',
      borderWidth: 3,
      fill: false,
      data: totalData,
      yAxisID: 'y',
    },
    {
      type: 'line' as const,
      label: '위험형',
      borderColor: '#392121',
      borderWidth: 2,
      fill: false,
      data: dangerData,
      yAxisID: 'y',
      hidden: true,
    },
    {
      type: 'line' as const,
      label: '중립형',
      borderColor: '#FAC152',
      borderWidth: 2,
      fill: false,
      data: middleData,
      yAxisID: 'y',
      hidden: true,
    },
    {
      type: 'line' as const,
      label: '안정형',
      borderColor: '#65A398',
      borderWidth: 2,
      fill: false,
      data: safeData,
      yAxisID: 'y',
      hidden: true,
    },
    // {
    //   type: 'bar' as const,
    //   label: 'Dataset 2',
    //   data: [0, 699, 0, 0, 108, 0, 60],
    //   backgroundColor: '#FF6464',
    //   borderWidth: 0,
    //   yAxisID: 'y1',
    // },
    {
      type: 'bar' as const,
      label: '실현손익',
      data: profitData,
      backgroundColor: profitData.map((value) => (value < 0 ? '#434FD9' : '#FF6464')),
      // backgroundColor: '#92D2BE',
      borderWidth: 0,
      yAxisID: 'y1',
    },
  ],
};

function triggerTooltip(chart: ChartJS | null) {
  const tooltip = chart?.tooltip;

  if (!tooltip) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2,
        },
        {
          datasetIndex: 3,
          index: 2,
        },
      ],
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      },
    );
  }

  chart.update();
}

export default function TradeChart() {
  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart);
  }, []);

  return (
    <Container>
      <Chart ref={chartRef} type='bar' data={data} options={options}/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;
