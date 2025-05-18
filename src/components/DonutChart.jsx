import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = ({showLegend}) => {
  const data = {
    labels: ["Active", "Expired", "Upcoming"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#0d6efd", "#dc3545", "#ffc107"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "30%",
    plugins: {
      legend: { display: showLegend },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;
