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
  const [language, setLanguage] =
    useState<SpeechLanguage>("en");
  const [explanation, setExplanation] =
    useState<Explanation | null>(null);

  // ✅ CORRECT destructuring (fixes Next.js build error)
  const {
    supported,
    listening,
    speaking,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
    speak,
    error,
    speechLang,
    setSpeechLang
  } = useSpeech(language);

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
          Type or speak a topic like “Data Structures” or
          “Operating Systems”. EduBridge AI explains it in a
          simple, intuitive way.
        </p>
      </header>

      <section className="grid gap-6 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[3fr,2fr]">
        <div className="space-y-3">
          <label className="block text-xs font-medium text-slate-700">
            Topic you want to understand
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => handleLanguageChange(opt.code)}
                className={`rounded px-3 py-1 text-xs ${
                  language === opt.code
                    ? "bg-brand-600 text-white"
                    : "border border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExplain}
            className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Explain this topic
          </button>
        </div>

        <div className="rounded-lg border bg-slate-50 p-3 space-y-2">
          <button
            onClick={listening ? stopListening : startListening}
            disabled={!supported}
            className="rounded bg-slate-900 px-3 py-1 text-xs text-white disabled:bg-slate-400"
          >
            {listening ? "Stop listening" : "Speak your topic"}
          </button>

          <button
            onClick={clearTranscript}
            className="rounded border px-3 py-1 text-xs"
          >
            Clear
          </button>

          <textarea
            value={transcript}
            readOnly
            className="w-full h-20 rounded border p-2 text-xs"
          />

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}
        </div>
      </section>

      {explanation && (
        <section className="rounded-xl border bg-white p-4 space-y-3">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold">
              Explanation for {explanation.topic}
            </h2>
            <button
              onClick={() =>
                explanationTextForSpeech &&
                speak(explanationTextForSpeech)
              }
              className="rounded border px-3 py-1 text-xs"
            >
              {speaking ? "Playing..." : "Listen"}
            </button>
          </div>

          <p>{explanation.summary}</p>
        </section>
      )}
    </div>
  );
}