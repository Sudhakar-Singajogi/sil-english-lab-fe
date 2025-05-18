import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "System Usage",
      data: [20, 40, 35, 60, 50, 70, 90],
      borderColor: "#0d6efd",
      backgroundColor: "#0d6efd",
      tension: 0.4,
      pointRadius: 4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function SystemUsageChart() {
  return <Line data={data} options={options} />;
}
