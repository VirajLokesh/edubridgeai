import type { StudentProfile } from "./ai";

export type StudentDashboardSnapshot = {
  id: string;
  name: string;
  semester: number;
  recentTopics: { topic: string; lastScore: number; lastAttempt: string }[];
  overallProgress: number;
};

export const sampleStudentProfile: StudentProfile = {
  name: "Arjun Kumar",
  semester: 3,
  interestedTracks: ["software-development"],
  strongTopics: ["data structures"],
  weakTopics: ["operating systems", "computer networks"],
  preferredLanguage: "hi"
};

export const sampleStudentDashboard: StudentDashboardSnapshot = {
  id: "s1",
  name: "Arjun Kumar",
  semester: 3,
  overallProgress: 62,
  recentTopics: [
    { topic: "data structures", lastScore: 78, lastAttempt: "Yesterday" },
    { topic: "operating systems", lastScore: 48, lastAttempt: "2 days ago" },
    { topic: "computer networks", lastScore: 55, lastAttempt: "Last week" }
  ]
};

export const teacherStudentDataset = [
  {
    id: "s1",
    name: "Arjun Kumar",
    topicScores: [
      { topic: "data structures", score: 78 },
      { topic: "operating systems", score: 48 },
      { topic: "computer networks", score: 55 }
    ]
  },
  {
    id: "s2",
    name: "Priya Sharma",
    topicScores: [
      { topic: "data structures", score: 65 },
      { topic: "operating systems", score: 39 },
      { topic: "computer networks", score: 42 }
    ]
  },
  {
    id: "s3",
    name: "Rahul Verma",
    topicScores: [
      { topic: "data structures", score: 52 },
      { topic: "operating systems", score: 58 },
      { topic: "computer networks", score: 33 }
    ]
  },
  {
    id: "s4",
    name: "Sai Lakshmi",
    topicScores: [
      { topic: "data structures", score: 88 },
      { topic: "operating systems", score: 72 },
      { topic: "computer networks", score: 69 }
    ]
  }
];

