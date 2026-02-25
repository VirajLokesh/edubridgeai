"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAccessibility } from "./AccessibilityContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/student/dashboard", label: "Student Dashboard" },
  { href: "/learn", label: "Learn" },
  { href: "/quiz", label: "Quiz" },
  { href: "/plan", label: "Study Plan" },
  { href: "/teacher/dashboard", label: "Teacher Analytics" },
  { href: "/career", label: "Career Guidance" },
  { href: "/about", label: "About & Impact" }
];

export function MainShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { highContrast, dyslexicFont, toggleHighContrast, toggleDyslexicFont } =
    useAccessibility();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4"
          aria-label="Main navigation"
        >
          <div className="flex flex-1 items-center gap-2">
            <div className="flex flex-col leading-tight">
              <span className="inline-flex w-fit rounded bg-brand-100 px-2 py-1 text-sm font-semibold text-brand-800">
                EduBridge AI
              </span>
              <span className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">
                AI-powered accessible and personalized learning
              </span>
            </div>
          </div>
          <ul className="hidden flex-1 justify-center gap-2 text-sm md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex min-h-[2.5rem] items-center rounded px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    pathname === item.href
                      ? "bg-brand-500 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={toggleHighContrast}
              className="inline-flex min-h-[2.25rem] items-center rounded border border-slate-300 px-3 py-1 text-xs hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-pressed={highContrast}
              aria-label="Toggle high contrast mode"
            >
              High contrast
            </button>
            <button
              type="button"
              onClick={toggleDyslexicFont}
              className="inline-flex min-h-[2.25rem] items-center rounded border border-slate-300 px-3 py-1 text-xs hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-pressed={dyslexicFont}
              aria-label="Toggle dyslexia friendly font"
            >
              Dyslexia font
            </button>
          </div>
        </nav>
      </header>

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-3 py-5 transition-transform transition-opacity duration-300 sm:px-4 sm:py-6"
      >
        {children}
      </main>

      <footer className="border-t bg-white/80 py-3 text-center text-xs text-slate-500">
        Built for inclusive education · AI + teachers, not AI vs teachers
      </footer>
    </div>
  );
}

