"use client";

import { Bar } from "react-chartjs-2";
import type { StudentRisk } from "@/lib/ai";
import "./ChartBase";

type Props = {
  data: StudentRisk[];
};

export function RiskIndicatorChart({ data }: Props) {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "Risk level",
        data: data.map((d) =>
          d.riskLevel === "high" ? 3 : d.riskLevel === "medium" ? 2 : 1
        ),
        backgroundColor: data.map((d) =>
          d.riskLevel === "high"
            ? "rgba(220,38,38,0.8)"
            : d.riskLevel === "medium"
            ? "rgba(234,179,8,0.8)"
            : "rgba(22,163,74,0.8)"
        )
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
        ticks: {
          stepSize: 1,
          callback: (value: number | string) => {
            if (value === 1) return "Low";
            if (value === 2) return "Medium";
            if (value === 3) return "High";
            return "";
          }
        },
        max: 3
      }
    }
  } as const;

  return <Bar aria-label="Student risk indicator chart" data={chartData} options={options} />;
}

