import "./globals.css";
import type { ReactNode } from "react";
import { AccessibilityProvider } from "../components/AccessibilityContext";
import { MainShell } from "../components/MainShell";

export const metadata = {
  title: "EduBridge AI",
  description:
    "AI-powered, accessible learning bridge for students and teachers."
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AccessibilityProvider>
          <MainShell>{children}</MainShell>
        </AccessibilityProvider>
      </body>
    </html>
  );
}

