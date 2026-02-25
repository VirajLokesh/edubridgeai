import Link from "next/link";
import { sampleStudentDashboard } from "@/lib/mockData";

export default function StudentDashboardPage() {
  const s = sampleStudentDashboard;

  return (
    <div className="space-y-8 animate-page">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Student dashboard
          </h1>
          <p className="text-sm text-slate-600">
            A quick snapshot of your learning journey. Use this as a home base
            before jumping into practice or career planning.
          </p>
        </div>
        <div className="rounded border border-slate-200 bg-white px-3 py-2 text-xs">
          <p className="font-semibold text-slate-800">{s.name}</p>
          <p className="text-slate-600">Semester {s.semester} · ID {s.id}</p>
        </div>
      </header>

      <section
        aria-label="Overall progress"
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[2fr,3fr]"
      >
        <div className="flex flex-col items-center justify-center space-y-2 border-r border-dashed border-slate-200 pr-4 md:items-start">
          <p className="text-xs font-medium text-slate-700">Overall progress</p>
          <p className="text-4xl font-bold text-brand-600">
            {s.overallProgress}%
          </p>
          <p className="text-[11px] text-slate-600">
            Progress blends quiz performance and completion of daily micro‑goals
            rather than only exam marks.
          </p>
        </div>
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-semibold text-slate-900">
            Recent activity
          </h2>
          <ul className="space-y-2">
            {s.recentTopics.map((t) => (
              <li
                key={t.topic}
                className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-slate-900">{t.topic}</p>
                  <p className="text-[11px] text-slate-600">
                    Last attempt: {t.lastAttempt}
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {t.lastScore}%
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-label="Next actions"
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3"
      >
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-semibold text-slate-900">
            1. Fix your concepts
          </h2>
          <p className="text-slate-700">
            Start with an explanation in your preferred language, then move into
            quick questions.
          </p>
          <Link
            href="/learn"
            className="inline-flex rounded bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Go to Learn
          </Link>
        </div>
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-semibold text-slate-900">
            2. Check your gaps
          </h2>
          <p className="text-slate-700">
            Use short quizzes to see which concepts keep going wrong and share
            this with your teacher.
          </p>
          <Link
            href="/quiz"
            className="inline-flex rounded bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Take a quiz
          </Link>
        </div>
        <div className="space-y-2 text-xs">
          <h2 className="text-sm font-semibold text-slate-900">
            3. Align to careers
          </h2>
          <p className="text-slate-700">
            See which roles match your strengths and what skills to build over
            the next 3 months.
          </p>
          <Link
            href="/career"
            className="inline-flex rounded bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700"
          >
            Explore careers
          </Link>
        </div>
      </section>
    </div>
  );
}

