"use client";

import { teacherAnalytics } from "@/lib/ai";
import { teacherStudentDataset } from "@/lib/mockData";
import { UnderstandingBarChart } from "@/components/charts/UnderstandingBarChart";
import { ConfusionHeatmap } from "@/components/charts/ConfusionHeatmap";
import { RiskIndicatorChart } from "@/components/charts/RiskIndicatorChart";

export default function TeacherDashboardPage() {
  const analytics = teacherAnalytics(teacherStudentDataset);

  return (
    <div className="space-y-8 animate-page">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">
          Teacher analytics dashboard
        </h1>
        <p className="text-sm text-slate-600">
          See which topics confuse your class, which students are drifting into
          risk, and how overall understanding is trending – without extra
          manual grading work.
        </p>
      </header>

      <section
        aria-label="Class overview"
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3"
      >
        <div className="space-y-1 text-xs">
          <p className="text-slate-600">Average understanding</p>
          <p className="text-3xl font-bold text-brand-600">
            {analytics.overallUnderstanding}%
          </p>
          <p className="text-[11px] text-slate-600">
            Calculated from topic‑wise quiz scores. Values below 60% indicate
            that pacing or revision strategy may need adjustment.
          </p>
        </div>
        <div className="space-y-1 text-xs">
          <p className="text-slate-600">High‑confusion topics</p>
          <p className="text-sm font-semibold text-red-700">
            {analytics.highConfusionTopics.length
              ? analytics.highConfusionTopics.join(", ")
              : "None detected in current data"}
          </p>
          <p className="text-[11px] text-slate-600">
            Confusion is marked when at least 40% of attempts fall below 50%
            marks in a topic.
          </p>
        </div>
        <div className="space-y-1 text-xs">
          <p className="text-slate-600">At‑risk students</p>
          <p className="text-sm font-semibold text-slate-900">
            {analytics.atRiskStudents.filter((s) => s.riskLevel === "high")
              .length}{" "}
            high ·{" "}
            {analytics.atRiskStudents.filter((s) => s.riskLevel === "medium")
              .length}{" "}
            medium
          </p>
          <p className="text-[11px] text-slate-600">
            Risk combines low average scores and repeated failures in core
            topics.
          </p>
        </div>
      </section>

      <section
        aria-label="Topic-wise performance charts"
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2"
      >
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Topic‑wise understanding
          </h2>
          <p className="text-[11px] text-slate-600">
            Use this to decide where to slow down, run remedial sessions, or
            set extra problem sheets.
          </p>
          <div className="h-64">
            <UnderstandingBarChart data={analytics.topicPerformance} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Confusion heatmap
          </h2>
          <p className="text-[11px] text-slate-600">
            Darker bars mean a higher percentage of students scoring below 50%
            in that topic.
          </p>
          <div className="h-64">
            <ConfusionHeatmap data={analytics.topicPerformance} />
          </div>
        </div>
      </section>

      <section
        aria-label="Student risk indicators"
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[3fr,2fr]"
      >
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-semibold text-slate-900">
            Individual student risk
          </h2>
          <p className="text-[11px] text-slate-600">
            Use this list during mentoring hours to prioritise conversations and
            share targeted study plans.
          </p>
          <ul className="space-y-2">
            {analytics.atRiskStudents.map((s) => (
              <li
                key={s.studentId}
                className="flex items-start justify-between rounded border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {s.name}
                  </p>
                  <p className="text-[11px] text-slate-600">{s.reason}</p>
                </div>
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                    s.riskLevel === "high"
                      ? "bg-red-100 text-red-800"
                      : s.riskLevel === "medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {s.riskLevel.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-semibold text-slate-900">
            Risk distribution
          </h2>
          <p className="text-[11px] text-slate-600">
            A quick visual sense of which students need immediate attention
            versus light monitoring.
          </p>
          <div className="h-64">
            <RiskIndicatorChart data={analytics.atRiskStudents} />
          </div>
        </div>
      </section>
    </div>
  );
}

