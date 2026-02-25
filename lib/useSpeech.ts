"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Supported language codes
 */
export type SpeechLanguage = "en" | "hi" | "ta" | "te";

/**
 * Hook return type (explicit for Next.js / Vercel)
 */
export type UseSpeechReturn = {
  supported: boolean;
  listening: boolean;
  speaking: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  clearTranscript: () => void;
  speak: (text: string) => void;
  error: string | null;
  speechLang: SpeechLanguage;
  setSpeechLang: React.Dispatch<React.SetStateAction<SpeechLanguage>>;
};

export function useSpeech(
  initialLang: SpeechLanguage = "en"
): UseSpeechReturn {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [speechLang, setSpeechLang] =
    useState<SpeechLanguage>(initialLang);

  const recognitionRef = useRef<any>(null);
  const synthRef =
    typeof window !== "undefined"
      ? window.speechSynthesis
      : null;

  // Detect browser support
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition || !synthRef) {
      setSupported(false);
      return;
    }

    setSupported(true);

    const recognition = new SpeechRecognition();
    recognition.lang = mapLang(speechLang);
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (e: any) => {
      setError(e?.error || "Speech recognition error");
      setListening(false);
    };

    recognition.onresult = (event: any) => {
      const text = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join(" ");
      setTranscript(text);
    };

    recognitionRef.current = recognition;
  }, [speechLang, synthRef]);

  const startListening = () => {
    if (!supported || !recognitionRef.current) return;
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  const speak = (text: string) => {
    if (!synthRef || !text) return;

    synthRef.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = mapLang(speechLang);

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    synthRef.speak(utterance);
  };

  return {
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
  };
}

function mapLang(lang: SpeechLanguage) {
  switch (lang) {
    case "hi":
      return "hi-IN";
    case "ta":
      return "ta-IN";
    case "te":
      return "te-IN";
    default:
      return "en-IN";
  }
}