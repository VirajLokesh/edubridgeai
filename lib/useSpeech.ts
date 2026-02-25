"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* =========================================================
   Supported languages for EduBridge AI
========================================================= */
export type SpeechLanguage = "en" | "ta" | "te" | "hi";

/* =========================================================
   Browser-only Web Speech API declarations
   (Required for Vercel / Node build)
========================================================= */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

/* =========================================================
   useSpeech Hook
========================================================= */
export function useSpeech(language: SpeechLanguage = "en") {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Map language code to browser locale
  const languageMap: Record<SpeechLanguage, string> = {
    en: "en-US",
    ta: "ta-IN",
    te: "te-IN",
    hi: "hi-IN",
  };

  /* ---------- Initialize Speech Recognition ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = languageMap[language];
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [language]);

  /* ---------- Start Speech-to-Text ---------- */
  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setTranscript("");
    setListening(true);
    recognitionRef.current.start();
  }, []);

  /* ---------- Stop Speech-to-Text ---------- */
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setListening(false);
  }, []);

  /* ---------- Text-to-Speech ---------- */
  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;
      if (!("speechSynthesis" in window)) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageMap[language];
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [language]
  );

  /* ---------- Stop Text-to-Speech ---------- */
  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
  }, []);

  return {
    listening,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}