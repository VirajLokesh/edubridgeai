import Link from "next/link";
import { TeamSection } from "@/components/TeamSection";

export default function LandingPage() {
  return (
    <div className="space-y-10 animate-page">
      <section
        aria-labelledby="hero-heading"
        className="grid items-center gap-8 md:grid-cols-[3fr,2fr]"
      >
        <div className="space-y-4">
          <h1
            id="hero-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            Bridge the gap between{" "}
            <span className="text-brand-600">college classrooms</span> and{" "}
            <span className="text-brand-600">industry‑ready skills</span>.
          </h1>
          <p className="text-sm text-slate-700">
            EduBridge AI is an accessible learning companion for Indian
            engineering students and teachers. It explains tough concepts in
            local languages, detects learning gaps through smart quizzes, and
            gives teachers real‑time insight without extra workload.
          </p>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed">
            <h2 className="mb-2 font-semibold text-slate-800">
              Core challenges and how EduBridge responds
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-semibold">Language &amp; culture:</span>{" "}
                Topic explanations adapt to English, Tamil, Telugu or Hindi
                context instead of being direct translations.
              </li>
              <li>
                <span className="font-semibold">Access &amp; disability:</span>{" "}
                Speech input/output and high‑contrast, dyslexia‑friendly UI help
                students who struggle with long text.
              </li>
              <li>
                <span className="font-semibold">Teacher overload:</span> Quiz
                data is auto‑aggregated into simple risk and confusion signals.
              </li>
              <li>
                <span className="font-semibold">Career mismatch:</span> Study
                plans and guidance connect subjects to concrete job roles.
              </li>
            </ul>
          </div>

          <div
            className="flex flex-wrap gap-3 text-sm"
            aria-label="Primary actions"
          >
            <Link
              href="/learn"
              className="rounded bg-brand-600 px-4 py-2 font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Start learning a topic
            </Link>
            <Link
              href="/student/dashboard"
              className="rounded border border-brand-600 px-4 py-2 font-semibold text-brand-700 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              View student journey
            </Link>
            <Link
              href="/teacher/dashboard"
              className="rounded border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Explore teacher analytics
            </Link>
          </div>
        </div>

        <aside
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          aria-label="Impact metrics"
        >
          <h2 className="text-sm font-semibold text-slate-900">
            Impact snapshot (simulated cohort)
          </h2>
          <dl className="space-y-3 text-xs text-slate-700">
            <div className="flex items-baseline justify-between">
              <dt className="font-medium">Drop in backlog risk</dt>
              <dd className="text-right text-2xl font-bold text-emerald-600">
                35%
              </dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="font-medium">Improvement in concept clarity</dt>
              <dd className="text-right text-2xl font-bold text-brand-600">
                +22 pts
              </dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="font-medium">Time saved per teacher / week</dt>
              <dd className="text-right text-2xl font-bold text-indigo-600">
                4 hrs
              </dd>
            </div>
          </dl>
          <p className="text-[11px] text-slate-500">
            Metrics are based on mock data but tuned to realistic college
            behaviour: weak topics show up early and targeted micro‑plans
            stabilise students before exams.
          </p>
        </aside>
      </section>

      <section
        aria-labelledby="how-it-works-heading"
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 text-xs md:grid-cols-3"
      >
        <div>
          <h2
            id="how-it-works-heading"
            className="mb-2 text-sm font-semibold text-slate-900"
          >
            How EduBridge AI works
          </h2>
          <p className="text-slate-700">
            Students talk or type their doubts, receive simple contextual
            explanations, and practise quick quizzes. The platform quietly
            tracks patterns and surfaces them to teachers as clear, visual
            signals.
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-slate-900">For students</h3>
          <ul className="list-disc pl-5 text-slate-700">
            <li>Topic explanations tuned to local language context.</li>
            <li>Short, daily micro‑goals instead of long, stressful plans.</li>
            <li>Career hints connected to what they are already studying.</li>
          </ul>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-slate-900">For teachers</h3>
          <ul className="list-disc pl-5 text-slate-700">
            <li>Confusion hotspots per topic and batch.</li>
            <li>Early warning on students drifting towards risk.</li>
            <li>Evidence to adjust pacing before internal exams.</li>
          </ul>
        </div>
      </section>

      <TeamSection title="Project team (preview)" maxMembers={4} />
    </div>
  );
}

