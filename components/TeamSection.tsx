"use client";

import Image from "next/image";
import type { TeamMember } from "@/lib/team";
import { teamMembers } from "@/lib/team";

type Props = {
  title?: string;
  maxMembers?: number;
};

export function TeamSection({ title = "Project team", maxMembers }: Props) {
  const members = maxMembers ? teamMembers.slice(0, maxMembers) : teamMembers;

  return (
    <section
      aria-labelledby="team-heading"
      className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-xs"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2
            id="team-heading"
            className="text-sm font-semibold text-slate-900"
          >
            {title}
          </h2>
          <p className="text-[11px] text-slate-600">
            A small, focused team combining product, AI and engineering to ship
            EduBridge AI as a usable prototype.
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {members.map((member) => (
          <article
            key={member.name}
            className="flex items-start gap-3 rounded border border-slate-200 bg-slate-50 p-3"
          >
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200">
              <Image
                src={member.image}
                alt={member.alt}
                width={56}
                height={56}
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900">
                {member.name}
              </h3>
              <p className="text-[11px] font-medium uppercase tracking-wide text-indigo-700">
                {member.role}
              </p>
              <p className="text-[11px] text-slate-700">
                {member.contribution}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

