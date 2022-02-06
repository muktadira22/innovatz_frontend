import React, { useEffect, useRef } from "react";

import { Chart, ChartData, ChartType, registerables } from "chart.js";

Chart.register(...registerables);

interface datashet {
  name: string;
  value: number;
}

interface ChartProps {
  data: datashet[];
  title: string;
  type: ChartType;
}

const MyChart = ({ data, title, type }: ChartProps) => {
  // helper function to format chart data since you do this twice
  const formatData = (data: datashet[]): ChartData => {
    return {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: title,
          data: data.map((item) => item.value),
        },
      ],
    };
  };

  // use a ref to store the chart instance since it it mutable
  const chartRef = useRef<Chart | null>(null);

  // callback creates the chart on the canvas element
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current?.destroy();
      chartRef.current = new Chart(ctx, {
        type: type,
        data: formatData(data),
        options: { responsive: true },
      });
    }
  };

  // effect to update the chart when props are updated
  useEffect(() => {
    // must verify that the chart exists
    if (chartRef.current) {
      chartRef.current.data = formatData(data);
      chartRef.current.update();
    }

    // cleanup function - I had to remove this as it was causing errors
    // return () => {
    //   chartRef.current?.destroy();
    // };
  }, [data]);

  return <canvas ref={canvasCallback}></canvas>;
};

export default MyChart;
