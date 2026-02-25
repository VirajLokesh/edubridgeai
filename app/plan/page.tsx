"use client";

import { useState } from "react";
import { generateStudyPlan, type StudyPlan } from "@/lib/ai";

const WEAK_AREA_OPTIONS = [
  "stack-usage",
  "stack-call-stack",
  "cpu-scheduling",
  "osi-layers"
];

export default function StudyPlanPage() {
  const [selected, setSelected] = useState<string[]>(["stack-usage"]);
  const [minutes, setMinutes] = useState(60);
  const [plan, setPlan] = useState<StudyPlan | null>(null);

  const toggleArea = (area: string) => {
    setSelected((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleGenerate = () => {
    const weakAreas = selected.length ? selected : ["revision-basics"];
    const p = generateStudyPlan(weakAreas, minutes);
    setPlan(p);
  };

  return (
    <div className="space-y-8 animate-page">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">
          Personalized 7‑day study plan
        </h1>
        <p className="text-sm text-slate-600">
          Convert your weak areas into a simple, time‑bounded routine. Plans are
          short, repeatable and realistic for busy students.
        </p>
      </header>

      <section
        aria-label="Study plan configuration"
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-slate-700">
              Concepts you are struggling with
            </legend>
            <p className="text-[11px] text-slate-600">
              Pick concepts flagged as weak in your quiz results or internal
              tests. You can start with 1–3 at a time.
            </p>
            <div className="flex flex-wrap gap-2">
              {WEAK_AREA_OPTIONS.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleArea(area)}
                  className={`rounded px-3 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    selected.includes(area)
                      ? "bg-brand-600 text-white"
                      : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={selected.includes(area)}
                >
                  {area}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              Minutes you can realistically study per day
              <input
                type="range"
                min={30}
                max={180}
                step={15}
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
                className="mt-2 w-full"
              />
            </label>
            <p className="text-sm font-semibold text-brand-700">
              {minutes} minutes / day
            </p>
            <p className="text-[11px] text-slate-600">
              The plan prefers regular, shorter sessions over long weekend
              marathons. This matches how the brain retains technical content.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Generate my 7‑day plan
        </button>
      </section>

      {plan && (
        <section
          aria-label="Generated study plan"
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Your personalised routine
              </h2>
              <p className="text-slate-600">
                Focus concepts:{" "}
                <span className="font-medium">
                  {plan.weakAreas.join(", ")}
                </span>
              </p>
            </div>
            <p className="text-slate-600">
              Daily load:{" "}
              <span className="font-semibold">
                {plan.totalMinutesPerDay} minutes
              </span>
            </p>
          </div>

          <p className="text-xs text-slate-700">{plan.rationale}</p>

          <ol className="grid gap-3 md:grid-cols-2">
            {plan.days.map((day) => (
              <li
                key={day.day}
                className="space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-xs"
              >
                <h3 className="font-semibold text-slate-900">
                  Day {day.day} · {day.minutes} min
                </h3>
                <p className="text-slate-700">
                  Focus:{" "}
                  <span className="font-medium">
                    {day.focusAreas.join(", ")}
                  </span>
                </p>
                <ul className="list-disc pl-5 text-slate-700">
                  {day.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <p className="text-[11px] text-slate-600">
            This plan is intentionally small. Once you complete 7 days, you can
            regenerate with new weak areas or a higher daily time to keep
            stretching your level.
          </p>
        </section>
      )}
    </div>
  );
}

