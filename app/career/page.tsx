"use client";

import { useState } from "react";
import { careerGuidance, type CareerGuidanceResult } from "@/lib/ai";
import { sampleStudentProfile } from "@/lib/mockData";

export default function CareerPage() {
  const [guidance] = useState<CareerGuidanceResult>(
    careerGuidance(sampleStudentProfile)
  );

  return (
    <div className="space-y-8 animate-page">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">
          Career guidance aligned to your subjects
        </h1>
        <p className="text-sm text-slate-600">
          Instead of generic job lists, EduBridge AI connects your strengths,
          weak areas and semester to concrete, 3‑month‑friendly career moves.
        </p>
      </header>

      <section
        aria-label="Profile summary"
        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-xs"
      >
        <div>
          <p className="font-semibold text-slate-900">
            {sampleStudentProfile.name}
          </p>
          <p className="text-slate-600">
            Semester {sampleStudentProfile.semester} · Preferred language:{" "}
            {sampleStudentProfile.preferredLanguage.toUpperCase()}
          </p>
        </div>
        <div className="space-y-1 text-slate-700">
          <p>
            Strong topics:{" "}
            <span className="font-medium">
              {sampleStudentProfile.strongTopics.join(", ")}
            </span>
          </p>
          <p>
            Weak topics:{" "}
            <span className="font-medium">
              {sampleStudentProfile.weakTopics.join(", ")}
            </span>
          </p>
        </div>
      </section>

      <section
        aria-label="Suggested career paths"
        className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Suggested direction
            </h2>
            <p className="text-slate-700">{guidance.summary}</p>
          </div>
          <p className="rounded bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-800">
            Primary track: {guidance.primaryTrack}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {guidance.paths.map((path) => (
            <article
              key={path.role}
              className="space-y-2 rounded border border-slate-200 bg-slate-50 p-3 text-xs"
            >
              <header>
                <h3 className="text-sm font-semibold text-slate-900">
                  {path.role}
                </h3>
                <p className="text-[11px] text-slate-600">
                  {path.description}
                </p>
              </header>
              <p className="text-slate-700">{path.suitabilityReason}</p>
              <div>
                <h4 className="font-semibold text-slate-900">
                  Skills to build
                </h4>
                <ul className="list-disc pl-5 text-slate-700">
                  {path.requiredSkills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              {path.currentGaps.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-700">Current gaps</h4>
                  <ul className="list-disc pl-5 text-slate-700">
                    {path.currentGaps.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h4 className="font-semibold text-slate-900">
                  3‑month roadmap
                </h4>
                <ol className="list-decimal pl-5 text-slate-700">
                  {path.roadmap.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

