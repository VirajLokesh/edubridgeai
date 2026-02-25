"use client";

import { Bar } from "react-chartjs-2";
import type { StudentTopicPerformance } from "@/lib/ai";
import "./ChartBase";

type Props = {
  data: StudentTopicPerformance[];
};

export function ConfusionHeatmap({ data }: Props) {
  const chartData = {
    labels: data.map((d) => d.topic),
    datasets: [
      {
        label: "Confusion rate",
        data: data.map((d) => d.confusionRate * 100),
        backgroundColor: data.map((d) =>
          d.confusionRate >= 0.4 ? "rgba(220,38,38,0.8)" : "rgba(234,179,8,0.8)"
        )
      }
    ]
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100
      }
    }
  } as const;

  return <Bar aria-label="Topic confusion heatmap" data={chartData} options={options} />;
}

