"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

type AccessibilityContextValue = {
  highContrast: boolean;
  dyslexicFont: boolean;
  toggleHighContrast: () => void;
  toggleDyslexicFont: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null
);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        dyslexicFont,
        toggleHighContrast: () => setHighContrast((v) => !v),
        toggleDyslexicFont: () => setDyslexicFont((v) => !v)
      }}
    >
      <div className={dyslexicFont ? "font-dyslexic" : ""}>{children}</div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return ctx;
}

