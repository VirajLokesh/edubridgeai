"use client";

import { useState } from "react";
import {
  generateQuiz,
  evaluateQuiz,
  type QuizQuestion,
  type QuizEvaluation
} from "@/lib/ai";

export default function QuizPage() {
  const [topic, setTopic] = useState("Data Structures");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [evaluation, setEvaluation] = useState<QuizEvaluation | null>(null);

  const handleGenerate = () => {
    const qs = generateQuiz(topic);
    setQuestions(qs);
    setAnswers({});
    setEvaluation(null);
  };

  const handleEvaluate = () => {
    if (!questions.length) return;
    const result = evaluateQuiz(answers);
    setEvaluation(result);
  };

  const unansweredCount =
    questions.length -
    questions.filter((q) => answers[q.id] !== undefined).length;

  return (
    <div className="space-y-8 animate-page">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">
          Quiz &amp; learning gap detection
        </h1>
        <p className="text-sm text-slate-600">
          Short, concept‑focused quizzes that highlight which ideas are strong
          and which need revision. Designed for quick daily practice, not long
          exams.
        </p>
      </header>

      <section
        aria-label="Quiz configuration"
        className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <label className="flex-1 text-xs font-medium text-slate-700">
            Topic to practise
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              placeholder="e.g. Data Structures, Operating Systems"
            />
          </label>
          <button
            type="button"
            onClick={handleGenerate}
            className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Generate quiz
          </button>
        </div>
        <p className="text-[11px] text-slate-600">
          Questions focus on when and why to use a concept, instead of only
          definitions. This makes it easier for teachers to see where thinking
          breaks.
        </p>
      </section>

      {questions.length > 0 && (
        <section
          aria-label="Quiz questions"
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="flex items-center justify-between text-xs text-slate-700">
            <p>
              {questions.length} questions generated for topic:{" "}
              <span className="font-semibold">{topic}</span>
            </p>
            <p>
              Unanswered:{" "}
              <span className="font-semibold">{unansweredCount}</span>
            </p>
          </div>

          <ol className="space-y-4">
            {questions.map((q, index) => (
              <li key={q.id} className="space-y-2 rounded border border-slate-200 p-3">
                <p className="text-sm font-medium text-slate-900">
                  Q{index + 1}. {q.question}
                </p>
                <fieldset className="space-y-1">
                  <legend className="sr-only">Answer choices</legend>
                  <div className="grid gap-1 text-xs text-slate-700 md:grid-cols-2">
                    {q.options.map((opt, optIndex) => {
                      const inputId = `${q.id}-${optIndex}`;
                      return (
                        <label
                          key={inputId}
                          htmlFor={inputId}
                          className={`flex cursor-pointer items-center gap-2 rounded border px-2 py-1 hover:bg-slate-50 ${
                            answers[q.id] === optIndex
                              ? "border-brand-600 bg-brand-50"
                              : "border-slate-200"
                          }`}
                        >
                          <input
                            id={inputId}
                            type="radio"
                            name={q.id}
                            value={optIndex}
                            checked={answers[q.id] === optIndex}
                            onChange={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [q.id]: optIndex
                              }))
                            }
                            className="h-3 w-3 border-slate-300 text-brand-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <button
              type="button"
              onClick={handleEvaluate}
              className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Evaluate my answers
            </button>
            <p className="text-slate-600">
              After evaluation, EduBridge AI highlights strong and weak concepts
              and estimates your confidence level.
            </p>
          </div>
        </section>
      )}

      {evaluation && (
        <section
          aria-label="Quiz evaluation"
          className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[2fr,3fr]"
        >
          <div className="space-y-3 text-xs">
            <h2 className="text-sm font-semibold text-slate-900">
              Overall performance
            </h2>
            <p className="text-slate-700">
              You answered{" "}
              <span className="font-semibold">{evaluation.correct}</span> out of{" "}
              <span className="font-semibold">
                {evaluation.totalQuestions}
              </span>{" "}
              questions correctly.
            </p>
            <p className="text-2xl font-bold text-brand-600">
              {evaluation.scorePercent}%
              <span className="ml-1 text-xs font-normal text-slate-500">
                score
              </span>
            </p>
            <p className="text-slate-700">
              Confidence estimate:{" "}
              <span className="font-semibold">
                {(evaluation.confidence * 100).toFixed(0)}%
              </span>{" "}
              – this is based on how many concepts you consistently got right,
              not just raw marks.
            </p>

            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-emerald-700">
                  Strength concepts
                </h3>
                {evaluation.strengths.length ? (
                  <ul className="list-disc pl-5 text-slate-700">
                    {evaluation.strengths.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600">
                    No strong concepts yet — repeat this quiz after revision to
                    see progress.
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-red-700">
                  Weak concepts to revise
                </h3>
                {evaluation.weaknesses.length ? (
                  <ul className="list-disc pl-5 text-slate-700">
                    {evaluation.weaknesses.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600">
                    No major weak patterns detected in this short quiz.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h2 className="text-sm font-semibold text-slate-900">
              Question‑wise feedback
            </h2>
            <ul className="space-y-2">
              {evaluation.perQuestion.map((pq) => (
                <li
                  key={pq.id}
                  className="rounded border border-slate-200 bg-slate-50 p-2"
                >
                  <p
                    className={`mb-1 font-semibold ${
                      pq.correct ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {pq.correct ? "Correct" : "Incorrect"} · Concept:{" "}
                    <span className="font-mono text-xs">{pq.concept}</span>
                  </p>
                  <p className="text-slate-700">{pq.explanation}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

