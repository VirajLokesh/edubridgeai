# EduBridge AI

EduBridge AI is an AI‑assisted learning platform for Indian engineering colleges. It focuses on students from non‑English backgrounds and overworked teachers who need insight, not more manual work.

## Problem statement

Current college systems struggle with:

- **Language barriers**: Core subjects are taught in English even when many students studied in regional‑language schools.
- **Accessibility gaps**: Long text, low‑contrast screens and keyboard‑unfriendly tools exclude students with reading or motor challenges.
- **One‑size‑fits‑all learning**: Everyone gets the same notes and timetable, regardless of prior knowledge or goals.
- **No real‑time teacher insight**: Teachers only see marks after internals or semester exams, when it is too late to course‑correct.
- **Career misalignment**: Students often choose roles based on buzzwords, not on their actual strengths and semester‑level readiness.

## Solution overview

EduBridge AI offers a **web‑based, accessible companion** that sits beside existing teaching:

- **Contextual explanations** of topics in English, Hindi, Tamil and Telugu (not just translations).
- **Speech input/output** using the browser's Web Speech API, helping students who prefer speaking over typing.
- **Quiz‑driven gap detection** that highlights strong and weak concepts instead of only raw marks.
- **Personalised 7‑day study plans** that turn weak areas into realistic micro‑goals.
- **Teacher analytics dashboard** with topic‑wise confusion, understanding scores and student risk indicators.
- **Career guidance** that connects subject performance to concrete roles and 3‑month roadmaps.

All AI logic is deterministic and mock‑based so the project can run fully on free tiers and be demoed reliably in hackathon conditions. Real LLM calls can be plugged in later without changing the UI.

## Architecture

- **Framework**: Next.js (App Router, TypeScript) with Tailwind CSS for styling.
- **Frontend and backend**: Single codebase. UI pages live under `app/`; mock AI logic and data live under `lib/`. Future server‑side APIs can be added under `app/api/*`.
- **AI logic**: `lib/ai.ts` contains all core "AI" behaviour as pure, deterministic functions:
  - `explainTopic(topic, language)` – returns an intuitive explanation, analogy and local‑context note.
  - `generateQuiz(topic)` and `evaluateQuiz(answers)` – work over a structured quiz bank to produce scores, strengths, weaknesses and confidence.
  - `generateStudyPlan(weakAreas, minutesPerDay)` – creates a realistic 7‑day micro‑plan.
  - `teacherAnalytics(studentData)` – aggregates topic scores into confusion rates and risk levels.
  - `careerGuidance(studentProfile)` – proposes tracks, roles, skill gaps and 3‑month roadmaps.
- **Mock data**: `lib/mockData.ts` provides a small, consistent dataset used across dashboards and analytics so that all pages tell a coherent story.
- **Speech layer**: `lib/useSpeech.ts` is a React hook around the **Web Speech API** (speech‑to‑text and text‑to‑speech) with safe feature detection and language switching.
- **Charts**: `components/charts/*` wrap **react‑chartjs‑2** and **Chart.js** into small, reusable visualisations for teacher dashboards.
- **Global layout & accessibility**: `app/layout.tsx` uses `AccessibilityProvider` and `MainShell` to give:
  - A consistent navigation bar and footer.
  - High‑contrast and dyslexia‑friendly font toggles.
  - A "Skip to main content" link and ARIA‑labelled controls.

This separation makes it easy to test core logic independently and to replace mock AI with real services later.

## Tech stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript.
- **Styling**: Tailwind CSS.
- **Charts**: Chart.js + react‑chartjs‑2.
- **AI layer**: Deterministic, rule‑based logic in `lib/ai.ts` (LLM‑ready interfaces).
- **Speech**: Browser Web Speech API (speech recognition + speech synthesis) via `useSpeech` hook.
- **Tooling**: ESLint, PostCSS, Tailwind CLI.

## Pages and flows

- **Landing page (`/`)**
  - Explains the problem, solution mapping and simulated impact metrics.
  - Clear calls to action for students and teachers.
- **Learn page (`/learn`)**
  - Topic input and language selector (English, Hindi, Tamil, Telugu).
  - Explanations generated via `explainTopic` with local analogy and teaching hints.
  - Optional speech input and "listen to explanation" via `useSpeech`.
- **Quiz page (`/quiz`)**
  - Topic‑based quiz generation via `generateQuiz`.
  - Radio‑button answers with keyboard‑friendly navigation.
  - Evaluation via `evaluateQuiz`, showing strengths, weaknesses and a confidence score.
- **Study plan page (`/plan`)**
  - Select weak concepts and daily time budget.
  - `generateStudyPlan` returns a 7‑day plan with focused activities per day.
  - Explanatory text clarifies why the plan is short and repeatable.
- **Student dashboard (`/student/dashboard`)**
  - Uses mock data to show progress %, recent topic scores and a 3‑step action hub (learn → quiz → career).
- **Teacher dashboard (`/teacher/dashboard`)**
  - `teacherAnalytics` aggregates the mock dataset.
  - Charts show topic‑wise understanding, confusion "heatmap", and individual student risk.
- **Career guidance (`/career`)**
  - `careerGuidance` suggests realistic roles, required skills, gaps and 3‑month roadmaps.
- **About & impact (`/about`)**
  - Summarises social impact, scalability model and future scope.

## Accessibility approach

EduBridge AI is built to be usable by keyboard‑first and screen‑reader users from day one:

- **Keyboard navigation**: All interactive elements are standard links or buttons; focus rings are visible via Tailwind styles.
- **Skip link**: A "Skip to main content" link jumps directly to the page content for screen‑reader and keyboard users.
- **ARIA attributes**: Buttons that act as toggles expose `aria-pressed`; navigation is grouped under appropriate `aria-label`s.
- **High‑contrast mode**: A toggle in the header switches to a high‑contrast theme using a `high-contrast` class on the root.
- **Dyslexia‑friendly font toggle**: Adds spacing and a dedicated font class to improve legibility for some readers.
- **Semantic structure**: Pages are organised with `<header>`, `<section>`, `<main>` and clear headings for screen‑reader scanning.

## Impact metrics (simulated but realistic)

The default dataset models a single batch with:

- **35% drop in backlog risk** when weak topics are flagged early and given 7‑day plans.
- **+22 point improvement** in concept clarity after repeated quiz + explanation cycles.
- **4 hours saved per teacher per week** by turning raw quiz data into dashboards rather than manual spreadsheets.

These values can be recalibrated when connected to real institutional data.

## Demo flow (for hackathon judges)

1. **Start at `/`**: Briefly explain the problem and show the impact snapshot.
2. **Open `/learn`**: Enter "Data Structures", switch to Hindi or Tamil, and show the explanation + TTS and speech input.
3. **Go to `/quiz`**: Generate a quiz on the same topic, answer a few questions, and show the evaluation and confidence score.
4. **Navigate to `/plan`**: Select weak concepts from the quiz, set 60‑90 minutes/day and generate a 7‑day plan.
5. **Show `/student/dashboard`**: Point out how the progress and recent topics summarise the student side of the story.
6. **Switch to `/teacher/dashboard`**: Walk through the charts (understanding, confusion, risk) and the at‑risk student list.
7. **Visit `/career`**: Highlight how current strengths and weaknesses map to specific roles and roadmaps.
8. **End on `/about`**: Close with social impact, scalability and future roadmap.

This sequence tells a complete story: from one confused student and an overloaded teacher to a more transparent, guided journey.

## Scalability & future scope

- **Plug‑in LLMs**: The functions in `lib/ai.ts` can internally call any LLM API without changing the calling code, enabling gradual upgrades.
- **Institutional deployment**: Each college can host its own Next.js instance, connect to its database and reuse the same analytics and UI.
- **Richer data sources**: Future versions can incorporate attendance, assignment submissions and lab performance for deeper risk models.
- **More languages and modalities**: With additional speech and translation models, the platform can support more Indian languages and sign‑language‑friendly video hints.

EduBridge AI is intentionally small but complete: it can be deployed on Vercel today, demoed reliably, and grown into a production‑grade assistant with minimal architectural changes.

