export type TeamMember = {
  name: string;
  role: string;
  contribution: string;
  image: string;
  alt: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "V Sravya Reddy",
    role: "Team Lead · Product & Coordination",
    contribution:
      "Led the overall concept, aligned the problem statement with hackathon goals and coordinated delivery across all modules.",
    image: "/team/arjun.svg",
    alt: "Illustrated avatar representing V Sravya Reddy"
  },
  {
    name: "Shameena Shaik",
    role: "AI Logic & Learning Design",
    contribution:
      "Shaped the mock AI behaviour for explanations, quizzes and study plans, keeping language and pedagogy student-friendly.",
    image: "/team/priya.svg",
    alt: "Illustrated avatar representing Shameena Shaik"
  },
  {
    name: "Likhitha Practuru",
    role: "Frontend Experience & Accessibility",
    contribution:
      "Implemented the key screens in Next.js, refined accessibility features and ensured the UI works well on mobile and desktop.",
    image: "/team/rahul.svg",
    alt: "Illustrated avatar representing Likhitha Practuru"
  },
  {
    name: "Vijaya Bharathi",
    role: "Quality, Testing & Documentation",
    contribution:
      "Verified flows end to end, validated speech and quiz behaviour, and contributed to documentation and demo readiness.",
    image: "/team/arjun.svg",
    alt: "Illustrated avatar representing Vijaya Bharathi"
  }
];

