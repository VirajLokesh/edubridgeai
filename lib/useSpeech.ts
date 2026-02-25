"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* =========================================================
   Supported languages
========================================================= */
export type SpeechLanguage = "en" | "ta" | "te" | "hi";

/* =========================================================
   Browser-only Web Speech API declarations
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

  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");

  const languageMap: Record<SpeechLanguage, string> = {
    en: "en-US",
    ta: "ta-IN",
    te: "te-IN",
    hi: "hi-IN",
  };

  /* ---------- Init Speech Recognition ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    setSupported(true);

    const recognition = new SpeechRecognition();
    recognition.lang = languageMap[language];
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      setTranscript(event.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, [language]);

  /* ---------- STT ---------- */
  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setTranscript("");
    setListening(true);
    recognitionRef.current.start();
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setListening(false);
  }, []);

  /* ---------- TTS ---------- */
  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;
      if (!("speechSynthesis" in window)) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageMap[language];

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [language]
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return {
    supported,
    listening,
    speaking,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}