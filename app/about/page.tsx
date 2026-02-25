import { TeamSection } from "@/components/TeamSection";

export default function AboutPage() {
  return (
    <div className="space-y-8 animate-page">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">
          About EduBridge AI
        </h1>
        <p className="text-sm text-slate-600">
          EduBridge AI is a hackathon‑ready prototype designed to show how
          responsible AI and thoughtful UX can make Indian engineering education
          more inclusive and outcome‑driven.
        </p>
      </header>

      <section
        aria-label="Social impact"
        className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-xs"
      >
        <h2 className="text-sm font-semibold text-slate-900">Social impact</h2>
        <p className="text-slate-700">
          Many first‑generation college students face a triple burden: English
          as a second language, limited access to coaching, and pressure to pick
          &quot;safe&quot; careers without guidance. EduBridge AI is built to
          reduce this gap by:
        </p>
        <ul className="list-disc pl-5 text-slate-700">
          <li>
            Providing simple, local‑context explanations that respect the
            student&apos;s language and background.
          </li>
          <li>
            Surfacing learning gaps early so teachers can intervene before
            backlogs appear.
          </li>
          <li>
            Connecting daily study efforts to clear, realistic career options.
          </li>
        </ul>
      </section>

      <section
        aria-label="Scalability"
        className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-xs"
      >
        <h2 className="text-sm font-semibold text-slate-900">Scalability</h2>
        <p className="text-slate-700">
          The system uses a simple, modular architecture: deterministic mock AI
          functions in a single library, reusable chart components, and
          Next.js&nbsp;App Router pages. In production, these mock functions can
          be swapped with low‑cost LLM endpoints without changing the UI.
        </p>
        <ul className="list-disc pl-5 text-slate-700">
          <li>
            Can be plugged into existing Learning Management Systems using API
            routes.
          </li>
          <li>
            Each college can maintain its own quiz bank while sharing the same
            analytics logic.
          </li>
          <li>
            Teacher dashboards scale naturally as more batches and departments
            are onboarded.
          </li>
        </ul>
      </section>

      <section
        aria-label="Future scope"
        className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-xs"
      >
        <h2 className="text-sm font-semibold text-slate-900">Future scope</h2>
        <ul className="list-disc pl-5 text-slate-700">
          <li>
            Integrate with real LLM APIs to generate context‑aware examples from
            students&apos; local environment (hostel, part‑time jobs, family
            responsibilities).
          </li>
          <li>
            Add multi‑student cohorts so teachers can compare sections and
            adjust teaching plans.
          </li>
          <li>
            Support more Indian languages and dialect‑level tuning with speech
            models.
          </li>
          <li>
            Provide anonymised institution‑level dashboards for policymakers to
            see systemic gaps.
          </li>
        </ul>
        <p className="text-[11px] text-slate-600">
          Throughout these extensions, the design principle remains the same:
          AI should reduce friction for teachers and students, not replace their
          judgement.
        </p>
      </section>

      <TeamSection />
    </div>
  );
}

