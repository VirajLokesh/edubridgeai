export type SupportedLanguage = "en" | "ta" | "te" | "hi";

export type Explanation = {
  topic: string;
  language: SupportedLanguage;
  level: "foundational" | "intuitive" | "exam_focused";
  summary: string;
  bullets: string[];
  analogy: string;
  localContextNote: string;
};

export type QuizQuestion = {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  concept: string;
  difficulty: "easy" | "medium" | "hard";
};

export type QuizEvaluation = {
  totalQuestions: number;
  correct: number;
  scorePercent: number;
  strengths: string[];
  weaknesses: string[];
  confidence: number;
  perQuestion: {
    id: string;
    correct: boolean;
    concept: string;
    explanation: string;
  }[];
};

export type StudyPlanDay = {
  day: number;
  focusAreas: string[];
  minutes: number;
  activities: string[];
};

export type StudyPlan = {
  totalMinutesPerDay: number;
  weakAreas: string[];
  days: StudyPlanDay[];
  rationale: string;
};

export type StudentTopicPerformance = {
  topic: string;
  averageScore: number;
  attempts: number;
  confusionRate: number;
};

export type StudentRisk = {
  studentId: string;
  name: string;
  riskLevel: "low" | "medium" | "high";
  reason: string;
};

export type TeacherAnalyticsResult = {
  topicPerformance: StudentTopicPerformance[];
  overallUnderstanding: number;
  highConfusionTopics: string[];
  atRiskStudents: StudentRisk[];
};

export type StudentProfile = {
  name: string;
  semester: number;
  interestedTracks: string[];
  strongTopics: string[];
  weakTopics: string[];
  preferredLanguage: SupportedLanguage;
};

export type CareerPath = {
  role: string;
  description: string;
  suitabilityReason: string;
  requiredSkills: string[];
  currentGaps: string[];
  roadmap: string[];
};

export type CareerGuidanceResult = {
  primaryTrack: string;
  summary: string;
  paths: CareerPath[];
};

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "English",
  ta: "Tamil",
  te: "Telugu",
  hi: "Hindi"
};

const CORE_TOPICS: Record<
  string,
  {
    simple: string;
    analogy: string;
    examAngle: string;
  }
> = {
  "data structures": {
    simple:
      "Data structures are organised ways of storing data so that we can use it efficiently during programs and exams.",
    analogy:
      "Imagine your hostel room: if clothes, books and notes are arranged in shelves and bags, you find them faster. If everything is on the floor, you waste time. Data structures are those shelves for your data.",
    examAngle:
      "In exams you are tested on when to choose arrays, linked lists, stacks, queues or trees so that time and memory are not wasted."
  },
  "operating systems": {
    simple:
      "An operating system is the main software that manages hardware and allows many programs to run safely together.",
    analogy:
      "Think of the OS as a strict lab in‑charge. It gives each student (program) a time slot on the computer, checks their ID and stops them from disturbing others.",
    examAngle:
      "Exams usually ask about CPU scheduling, deadlocks, memory management and concurrency: how OS shares limited resources fairly."
  },
  "computer networks": {
    simple:
      "Computer networks connect machines so they can share data reliably even if they are far away.",
    analogy:
      "Like a postal system with different levels: local postman, district centre, state hub. Each level forwards letters using rules. In networks these are routers, switches and protocols.",
    examAngle:
      "Exam questions focus on OSI layers, TCP/UDP, routing and how errors are detected and corrected in transmission."
  }
};

function normaliseTopic(raw: string): string {
  const t = raw.trim().toLowerCase();
  if (t.includes("data structure")) return "data structures";
  if (t.includes("os") || t.includes("operating")) return "operating systems";
  if (t.includes("network")) return "computer networks";
  return "data structures";
}

export function explainTopic(
  topic: string,
  language: SupportedLanguage
): Explanation {
  const key = normaliseTopic(topic);
  const base = CORE_TOPICS[key];

  const languageHint =
    language === "en"
      ? "Language: English – explanation kept simple for first‑gen engineering students."
      : `Language: ${LANGUAGE_LABELS[language]} – keep English terms like 'stack' or 'process', but explain them in local language during teaching.`;

  return {
    topic: key,
    language,
    level: "intuitive",
    summary: base.simple,
    bullets: [
      "Start from a real‑life situation a typical Indian engineering student faces.",
      "Connect that situation to the core definition of the concept.",
      "Show where it appears in syllabus (unit names, lab exercises, viva questions).",
      "End with 1–2 quick check questions the student can answer aloud."
    ],
    analogy: base.analogy,
    localContextNote: languageHint
  };
}

const QUIZ_BANK: QuizQuestion[] = [
  {
    id: "ds-1",
    topic: "data structures",
    question:
      "Which data structure is best when you mainly add or remove items only from one end?",
    options: ["Array", "Stack", "Queue", "Graph"],
    correctIndex: 1,
    concept: "stack-usage",
    difficulty: "easy"
  },
  {
    id: "ds-2",
    topic: "data structures",
    question:
      "Which operation of a stack is used when a function call ends in C/Java?",
    options: ["Push", "Pop", "Enqueue", "Traverse"],
    correctIndex: 1,
    concept: "stack-call-stack",
    difficulty: "medium"
  },
  {
    id: "os-1",
    topic: "operating systems",
    question:
      "Round Robin scheduling is mainly used to improve which factor in a time‑sharing system?",
    options: ["Throughput", "Turnaround time", "Response time", "Context switch"],
    correctIndex: 2,
    concept: "cpu-scheduling",
    difficulty: "medium"
  },
  {
    id: "net-1",
    topic: "computer networks",
    question:
      "At which OSI layer do switches mainly operate in a typical LAN?",
    options: ["Physical", "Data Link", "Network", "Transport"],
    correctIndex: 1,
    concept: "osi-layers",
    difficulty: "easy"
  }
];

export function generateQuiz(topic: string): QuizQuestion[] {
  const key = normaliseTopic(topic);
  const selected = QUIZ_BANK.filter((q) => q.topic === key);
  return selected.length ? selected : QUIZ_BANK.filter((q) => q.topic === "data structures");
}

export function evaluateQuiz(answers: {
  [questionId: string]: number;
}): QuizEvaluation {
  let correct = 0;
  const perQuestion: QuizEvaluation["perQuestion"] = [];
  const seenConcepts = new Map<string, { total: number; wrong: number }>();

  const answeredQuestions = QUIZ_BANK.filter((q) => answers[q.id] !== undefined);

  for (const q of answeredQuestions) {
    const chosen = answers[q.id];
    const isCorrect = chosen === q.correctIndex;
    if (isCorrect) correct += 1;

    const conceptStats = seenConcepts.get(q.concept) ?? { total: 0, wrong: 0 };
    conceptStats.total += 1;
    if (!isCorrect) conceptStats.wrong += 1;
    seenConcepts.set(q.concept, conceptStats);

    perQuestion.push({
      id: q.id,
      correct: isCorrect,
      concept: q.concept,
      explanation: isCorrect
        ? "You linked the concept correctly. Try to explain the reasoning in your own words."
        : "Revisit when to use this concept and note a real‑life example. That will fix the confusion more strongly than memorising."
    });
  }

  const total = answeredQuestions.length || 1;
  const scorePercent = Math.round((correct / total) * 100);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  seenConcepts.forEach((stats, concept) => {
    const wrongRatio = stats.wrong / stats.total;
    if (wrongRatio <= 0.25) {
      strengths.push(concept);
    } else if (wrongRatio >= 0.5) {
      weaknesses.push(concept);
    }
  });

  const confidence =
    scorePercent >= 80 ? 0.9 : scorePercent >= 60 ? 0.7 : scorePercent >= 40 ? 0.5 : 0.3;

  return {
    totalQuestions: total,
    correct,
    scorePercent,
    strengths,
    weaknesses,
    confidence,
    perQuestion
  };
}

export function generateStudyPlan(
  weakAreas: string[],
  minutesPerDay: number
): StudyPlan {
  const safeMinutes = Math.max(30, Math.min(minutesPerDay, 180));
  const focusAreas = weakAreas.length ? weakAreas : ["revision-basics"];
  const days: StudyPlanDay[] = [];

  for (let day = 1; day <= 7; day++) {
    const area = focusAreas[(day - 1) % focusAreas.length];
    const activities: string[] = [
      "Read core concept from class notes or textbook for 10 minutes.",
      "Write a 3–4 line explanation in your own words.",
      "Solve at least 3 short questions or previous year problems.",
      "Spend last 5 minutes summarising what you learnt aloud."
    ];

    if (area.includes("stack") || area.includes("queue")) {
      activities.push("Draw the structure step by step for push/pop operations.");
    }

    days.push({
      day,
      focusAreas: [area],
      minutes: safeMinutes,
      activities
    });
  }

  return {
    totalMinutesPerDay: safeMinutes,
    weakAreas: focusAreas,
    days,
    rationale:
      "Plan keeps daily load realistic, repeats weak areas with small variations, and forces active recall instead of passive reading."
  };
}

export function teacherAnalytics(studentData: {
  id: string;
  name: string;
  topicScores: { topic: string; score: number }[];
}[]): TeacherAnalyticsResult {
  const topicMap = new Map<
    string,
    { totalScore: number; count: number; lowCount: number }
  >();

  for (const student of studentData) {
    for (const t of student.topicScores) {
      const entry = topicMap.get(t.topic) ?? {
        totalScore: 0,
        count: 0,
        lowCount: 0
      };
      entry.totalScore += t.score;
      entry.count += 1;
      if (t.score < 50) entry.lowCount += 1;
      topicMap.set(t.topic, entry);
    }
  }

  const topicPerformance: StudentTopicPerformance[] = [];
  let overallSum = 0;
  let overallCount = 0;

  topicMap.forEach((entry, topic) => {
    const avg = entry.totalScore / entry.count;
    const confusionRate = entry.lowCount / entry.count;
    topicPerformance.push({
      topic,
      averageScore: Math.round(avg),
      attempts: entry.count,
      confusionRate: Number(confusionRate.toFixed(2))
    });
    overallSum += avg;
    overallCount += 1;
  });

  const overallUnderstanding =
    overallCount === 0 ? 0 : Math.round(overallSum / overallCount);

  const highConfusionTopics = topicPerformance
    .filter((tp) => tp.confusionRate >= 0.4)
    .map((tp) => tp.topic);

  const atRiskStudents: StudentRisk[] = studentData.map((s) => {
    const avg =
      s.topicScores.reduce((sum, t) => sum + t.score, 0) /
      (s.topicScores.length || 1);
    const lowCount = s.topicScores.filter((t) => t.score < 40).length;

    let riskLevel: StudentRisk["riskLevel"] = "low";
    let reason = "Consistent performance.";

    if (avg < 45 || lowCount >= 2) {
      riskLevel = "high";
      reason = "Multiple core topics below pass mark – needs immediate support.";
    } else if (avg < 60 || lowCount === 1) {
      riskLevel = "medium";
      reason =
        "Borderline performance in at least one foundational topic – plan targeted revision.";
    }

    return {
      studentId: s.id,
      name: s.name,
      riskLevel,
      reason
    };
  });

  return {
    topicPerformance,
    overallUnderstanding,
    highConfusionTopics,
    atRiskStudents
  };
}

export function careerGuidance(profile: StudentProfile): CareerGuidanceResult {
  const track =
    profile.interestedTracks[0] ??
    (profile.strongTopics.includes("data structures")
      ? "software-development"
      : "foundational-upskilling");

  const paths: CareerPath[] = [];

  if (track === "software-development") {
    paths.push({
      role: "Backend Developer (Entry Level)",
      description:
        "Work on APIs and services using strong data structures and operating systems understanding.",
      suitabilityReason:
        "Your interest in development plus strength in core CS makes backend a natural starting point.",
      requiredSkills: [
        "1 language in depth (Java, Python, or Node.js)",
        "Data structures and algorithms",
        "Databases and SQL",
        "Basic Linux and Git"
      ],
      currentGaps: profile.weakTopics,
      roadmap: [
        "Month 1: Fix weak topics from DS/OS using daily micro‑plans.",
        "Month 2: Build 2 mini‑projects (API + database).",
        "Month 3: Practise 60–80 coding problems and mock interviews."
      ]
    });
  } else if (track === "ai-ml") {
    paths.push({
      role: "Machine Learning Engineer (Junior)",
      description:
        "Use maths and programming to build models that solve domain problems.",
      suitabilityReason:
        "Your interest in AI/ML plus willingness to work on maths can open this path.",
      requiredSkills: [
        "Python and libraries (NumPy, pandas, scikit‑learn)",
        "Statistics and linear algebra basics",
        "Model evaluation and deployment basics"
      ],
      currentGaps: profile.weakTopics,
      roadmap: [
        "Month 1: Strengthen Python and maths basics.",
        "Month 2: Complete 2–3 ML mini‑projects on real datasets.",
        "Month 3: Learn basic deployment and prepare portfolio."
      ]
    });
  } else {
    paths.push({
      role: "Foundational Skills Track",
      description:
        "First stabilise core subjects, then choose a specialisation with confidence.",
      suitabilityReason:
        "Before committing to a specific career, building strong subject fundamentals will reduce anxiety and backlogs.",
      requiredSkills: [
        "Clear understanding of at least 3 core CS subjects",
        "Basic project building confidence",
        "Exam‑oriented revision strategy"
      ],
      currentGaps: profile.weakTopics,
      roadmap: [
        "Month 1: Identify and fix 2 weakest subjects using structured plans.",
        "Month 2: Build 1 simple project applying those subjects.",
        "Month 3: Explore different tracks (web, data, embedded) via short courses."
      ]
    });
  }

  return {
    primaryTrack: track,
    summary:
      "Based on your interests and current strengths, these paths balance employability with realistic next steps.",
  paths
  };
}

// NOTE: All functions above use deterministic, rule-based logic.
// In production, you can replace internal implementations with LLM calls,
// while keeping the same function signatures so the UI remains unchanged.

