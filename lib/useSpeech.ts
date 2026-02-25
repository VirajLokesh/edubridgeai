"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechLanguage = "en" | "ta" | "te" | "hi";

const STT_LANG_MAP: Record<SpeechLanguage, string> = {
  en: "en-IN",
  ta: "ta-IN",
  te: "te-IN",
  hi: "hi-IN"
};

const TTS_LANG_MAP: Record<SpeechLanguage, string> = {
  en: "en-IN",
  ta: "ta-IN",
  te: "te-IN",
  hi: "hi-IN"
};

type UseSpeechOptions = {
  initialLanguage?: SpeechLanguage;
};

type UseSpeechReturn = {
  supported: boolean;
  listening: boolean;
  speaking: boolean;
  transcript: string;
  error: string | null;
  language: SpeechLanguage;
  setLanguage: (lang: SpeechLanguage) => void;
  startListening: () => void;
  stopListening: () => void;
  clearTranscript: () => void;
  speak: (text: string) => void;
};

export function useSpeech(options: UseSpeechOptions = {}): UseSpeechReturn {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<SpeechLanguage>(
    options.initialLanguage ?? "en"
  );

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionImpl =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      null;

    if (!SpeechRecognitionImpl || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    setSupported(true);

    const recognition: SpeechRecognition = new SpeechRecognitionImpl();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = STT_LANG_MAP[language];

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text.trim());
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.lang = STT_LANG_MAP[language];
  }, [language]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setError(null);
    setTranscript("");
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch {
      setError("Unable to start speech recognition.");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setListening(false);
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }
      if (!text.trim()) return;

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = TTS_LANG_MAP[language];
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => {
        setSpeaking(false);
        setError("Unable to speak text.");
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [language]
  );

  return {
    supported,
    listening,
    speaking,
    transcript,
    error,
    language,
    setLanguage,
    startListening,
    stopListening,
    clearTranscript,
    speak
  };
}

