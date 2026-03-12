"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { animation } from "@/lib/design-tokens";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  const pathname = usePathname();
  const isDiscussion = pathname === "/discussion";

  return (
    <main className="h-full flex flex-col bg-[#060D1A] overflow-hidden">
      {/* Header */}
      <section className="py-4 px-4 sm:py-5 sm:px-6 border-b border-[#1E3A5F] bg-[#0C1830]/50 shrink-0">
        <div className="max-w-5xl mx-auto">
          {eyebrow && (
            <motion.p
              className="text-xs font-medium tracking-widest uppercase text-[#4D6B8A] mb-2"
              {...animation.fadeUp}
              transition={{ ...animation.fadeUp.transition, delay: 0 }}
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F0F6FF] mb-2 text-balance"
            {...animation.fadeUp}
            transition={{ ...animation.fadeUp.transition, delay: 0.08 }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              className="text-sm leading-relaxed text-[#8BA3C1] max-w-2xl"
              {...animation.fadeUp}
              transition={{ ...animation.fadeUp.transition, delay: 0.16 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 min-h-0 overflow-y-auto py-4 px-4 sm:py-6 sm:px-6">
        <div className="max-w-7xl mx-auto">{children}</div>

        {/* Discussion CTA */}
        {!isDiscussion && (
          <motion.div
            className="max-w-7xl mx-auto mt-8 mb-2 flex justify-end"
            {...animation.fadeUp}
            transition={{ ...animation.fadeUp.transition, delay: 0.3 }}
          >
            <Link
              href="/discussion"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-semibold transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Go to Discussion
            </Link>
          </motion.div>
        )}
      </section>
    </main>
  );
}
