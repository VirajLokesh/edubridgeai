"use client";

import { Bar } from "react-chartjs-2";
import type { StudentTopicPerformance } from "@/lib/ai";
import "./ChartBase";

type Props = {
  data: StudentTopicPerformance[];
};

export function UnderstandingBarChart({ data }: Props) {
  const chartData = {
    labels: data.map((d) => d.topic),
    datasets: [
      {
        label: "Average score",
        data: data.map((d) => d.averageScore),
        backgroundColor: "rgba(37, 99, 235, 0.7)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  } as const;

  return <Bar aria-label="Topic-wise understanding chart" data={chartData} options={options} />;
}

