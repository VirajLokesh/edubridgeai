"use client";

import { useState } from "react";
import { explainTopic, type Explanation } from "@/lib/ai";
import { useSpeech, type SpeechLanguage } from "@/lib/useSpeech";

const LANGUAGE_OPTIONS: { code: SpeechLanguage; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" }
];

export default function LearnPage() {
  const [topic, setTopic] = useState("Data Structures");
  const [language, setLanguage] = useState<SpeechLanguage>("en");
  const [explanation, setExplanation] = useState<Explanation | null>(null);

  const {
    supported,
    listening,
    speaking,
    transcript,
    error,
    language: speechLang,
    setLanguage: setSpeechLang,
    startListening,
    stopListening,
    clearTranscript,
    speak
  } = useSpeech({ initialLanguage: "en" });

  const handleExplain = () => {
    const exp = explainTopic(topic, language);
    setExplanation(exp);
  };

  const handleLanguageChange = (code: SpeechLanguage) => {
    setLanguage(code);
    setSpeechLang(code);
  };

  const explanationTextForSpeech =
    explanation &&
    `${explanation.summary} ${explanation.analogy}. Note: ${explanation.localContextNote}`;

  return (
    <div className="space-y-8 animate-page">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">
          Learn a concept in your own language
        </h1>
        <p className="text-sm text-slate-600">
          Type or speak a topic like &quot;Data Structures&quot; or
          &quot;Operating Systems&quot;. EduBridge AI gives a short, intuitive
          explanation tuned for Indian engineering students.
        </p>
      </header>

      <section
        aria-label="Topic input and language selection"
        className="grid gap-6 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[3fr,2fr]"
      >
        <div className="space-y-3">
          <label className="block text-xs font-medium text-slate-700">
            Topic you want to understand
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              placeholder="e.g. Data Structures, Operating Systems"
            />
          </label>

          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-slate-700">
              Language context
            </legend>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleLanguageChange(opt.code)}
                  className={`rounded px-3 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    language === opt.code
                      ? "bg-brand-600 text-white"
                      : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={language === opt.code}
                >
                  {opt.label}
                  {speechLang === opt.code ? " · speech" : ""}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={handleExplain}
            className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Explain this topic
          </button>

          {!supported && (
            <p className="text-[11px] text-amber-700">
              Your browser does not fully support speech features. Typing still
              works fine.
            </p>
          )}
        </div>

        <div
          className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
          aria-label="Speech input and output"
        >
          <h2 className="text-xs font-semibold text-slate-800">
            Optional: Speak instead of typing
          </h2>
          <p className="text-[11px] text-slate-600">
            Use your voice to enter a topic or ask a follow‑up doubt. Great for
            students who prefer speaking over typing.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={listening ? stopListening : startListening}
              disabled={!supported}
              className={`rounded px-3 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                listening
                  ? "bg-red-600 text-white"
                  : "bg-slate-900 text-white disabled:bg-slate-400"
              }`}
              aria-pressed={listening}
              aria-label="Toggle speech to text recording"
            >
              {listening ? "Stop listening" : "Speak your topic / doubt"}
            </button>
            <button
              type="button"
              onClick={clearTranscript}
              className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Clear text
            </button>
          </div>
          <label className="block text-[11px] font-medium text-slate-700">
            Transcribed text
            <textarea
              value={transcript}
              onChange={() => {}}
              className="mt-1 h-20 w-full resize-none rounded border border-slate-300 p-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Transcribed speech text"
            />
          </label>
          {error && (
            <p className="text-[11px] text-red-700" role="status">
              {error}
            </p>
          )}
        </div>
      </section>

      {explanation && (
        <section
          aria-label="Contextual explanation"
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Intuitive explanation for {explanation.topic}
              </h2>
              <p className="text-[11px] text-slate-600">
                Level:{" "}
                <span className="font-medium capitalize">
                  {explanation.level.replace("_", " ")}
                </span>{" "}
                · Language context: {explanation.language.toUpperCase()}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                explanationTextForSpeech ? speak(explanationTextForSpeech) : null
              }
              className="rounded border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-pressed={speaking}
              aria-label="Play explanation using text to speech"
            >
              {speaking ? "Playing..." : "Listen to explanation"}
            </button>
          </div>

          <p className="text-sm text-slate-800">{explanation.summary}</p>

          <div className="grid gap-3 text-xs md:grid-cols-2">
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900">
                How to teach / learn it
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-700">
                {explanation.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900">Local analogy</h3>
              <p className="text-slate-700">{explanation.analogy}</p>
              <p className="text-[11px] text-slate-500">
                Context note: {explanation.localContextNote}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

