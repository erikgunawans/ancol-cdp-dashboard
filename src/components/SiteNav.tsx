"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { useTheme } from "@/lib/theme-context";

// ─── Nav data ────────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    group: "Story",
    links: [
      { label: "Home",            href: "/" },
      { label: "Strategic Brief", href: "/summary" },
      { label: "The Challenge",   href: "/problem" },
    ],
  },
  {
    group: "Platform",
    links: [
      { label: "Architecture", href: "/architecture" },
      { label: "Data Flow",    href: "/data-flow" },
    ],
  },
  {
    group: "Analytics",
    links: [
      { label: "Executive Overview", href: "/overview" },
      { label: "Visitors",           href: "/visitors" },
      { label: "Revenue",            href: "/revenue" },
      { label: "Engagement",         href: "/engagement" },
      { label: "Segments",           href: "/segments" },
      { label: "Real-time",          href: "/realtime" },
    ],
  },
  {
    group: "Strategy",
    links: [
      { label: "Customer Journey", href: "/journey" },
      { label: "80 Use Cases",     href: "/use-cases" },
      { label: "Roadmap",          href: "/roadmap" },
    ],
  },
  {
    group: "Discussion",
    links: [
      { label: "Discussion",        href: "/discussion" },
      { label: "Specific Use Case", href: "/specific-use-case" },
    ],
  },
];

function groupId(name: string, prefix: string) {
  return `${prefix}-nav-${name.toLowerCase().replace(/\s+/g, "-")}`;
}

// ─── Collapse icon ────────────────────────────────────────────────────────────

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  );
}

// ─── Desktop sidebar ──────────────────────────────────────────────────────────

function DesktopSidebar({ pathname }: { pathname: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [closedGroups, setClosedGroups] = useState<Set<string>>(new Set(["Analytics"]));
  const { theme, toggle } = useTheme();

  const toggleGroup = (group: string) => {
    setClosedGroups(prev => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  return (
    <aside
      className={`hidden md:flex flex-col shrink-0 h-screen bg-[#0C1830] border-r border-[#1E3A5F] overflow-hidden transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-[260px]"
      }`}
    >
      {/* Brand header */}
      <div className={`flex items-center border-b border-[#1E3A5F] ${isCollapsed ? "px-3 py-5 justify-center" : "px-5 py-5"}`}>
        {isCollapsed ? (
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0076CC] to-[#C41E3A] flex items-center justify-center text-white text-xs font-black shrink-0">
            A
          </Link>
        ) : (
          <Link href="/" className="block min-w-0">
            <p className="text-base font-bold text-[#F0F6FF] hover:text-[#38B6FF] transition-colors truncate">
              Ancol 360°{"\u200B"}
            </p>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#4D6B8A] mt-0.5">
              CDP Dashboard
            </p>
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 py-4 overflow-y-auto no-scrollbar ${isCollapsed ? "px-2 space-y-1" : "px-3 space-y-5"}`}>
        {isCollapsed ? (
          // Collapsed: show all links as dots — 44×44px touch targets
          NAV_GROUPS.flatMap(g => g.links).map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
                className={`flex items-center justify-center w-11 h-11 mx-auto rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#0076CC]/20 text-[#38B6FF]"
                    : "text-[#4D6B8A] hover:text-[#F0F6FF] hover:bg-[#112040]"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#38B6FF]" : "bg-current"}`} />
              </Link>
            );
          })
        ) : (
          // Expanded: collapsible nav groups with aria-expanded
          NAV_GROUPS.map(group => {
            const isClosed = closedGroups.has(group.group);
            const contentId = groupId(group.group, "desktop");
            return (
              <div key={group.group}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.group)}
                  aria-expanded={!isClosed}
                  aria-controls={contentId}
                  className="w-full flex items-center justify-between px-3 mb-1 group"
                >
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#4D6B8A] group-hover:text-[#8BA3C1] transition-colors">
                    {group.group}
                  </span>
                  <svg
                    className={`w-3 h-3 text-[#4D6B8A] group-hover:text-[#8BA3C1] transition-all duration-200 ${isClosed ? "-rotate-90" : "rotate-0"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {!isClosed && (
                    <motion.div
                      id={contentId}
                      key="links"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-0.5 pb-1">
                        {group.links.map(link => {
                          const isActive = pathname === link.href;
                          return (
                            <Link key={link.href} href={link.href}
                              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                  ? "nav-active text-[#38B6FF]"
                                  : "text-[#8BA3C1] hover:text-[#F0F6FF] hover:bg-[#112040]"
                              }`}
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </nav>

      {/* Bottom — status + collapse toggle */}
      <div className={`border-t border-[#1E3A5F] ${isCollapsed ? "px-2 py-3 flex flex-col items-center gap-2" : "px-3 py-4"}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse shrink-0" />
            <span className="text-xs text-[#4D6B8A]">All systems nominal</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" title="All systems nominal" />
        )}
        {!isCollapsed && (
          <p className="px-3 text-[10px] font-semibold tracking-widest text-[#4D6B8A]/60 uppercase mt-1 mb-2">
            Ancol 360° CDP v1.0
          </p>
        )}

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className={`flex items-center gap-2 text-[#4D6B8A] hover:text-[#F0F6FF] hover:bg-[#112040] transition-all duration-200 rounded-xl ${
            isCollapsed ? "w-11 h-11 justify-center mb-1" : "w-full px-3 py-2.5 text-sm font-medium mb-1"
          }`}
        >
          {theme === "dark" ? (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M18.364 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
          {!isCollapsed && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
        </button>

        <button
          type="button"
          onClick={() => setIsCollapsed(v => !v)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex items-center gap-2 text-[#4D6B8A] hover:text-[#F0F6FF] hover:bg-[#112040] transition-all duration-200 rounded-xl ${
            isCollapsed ? "w-11 h-11 justify-center" : "w-full px-3 py-2.5 text-sm font-medium"
          }`}
        >
          <CollapseIcon collapsed={isCollapsed} />
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

// ─── Mobile drawer content ────────────────────────────────────────────────────

function MobileNavContent({
  pathname,
  onLinkClick,
  showBrand,
}: {
  pathname: string;
  onLinkClick?: () => void;
  showBrand?: boolean;
}) {
  const [closedGroups, setClosedGroups] = useState<Set<string>>(new Set(["Analytics"]));
  const { theme, toggle } = useTheme();

  const toggleGroup = (group: string) => {
    setClosedGroups(prev => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  return (
    <>
      {showBrand && (
        <div className="px-5 py-5 border-b border-[#1E3A5F]">
          <Link href="/" {...(onLinkClick && { onClick: onLinkClick })}
            className="block text-base font-bold text-[#F0F6FF] hover:text-[#38B6FF] transition-colors">
            Ancol 360°{"\u200B"}
          </Link>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#4D6B8A] mt-0.5">CDP Dashboard</p>
        </div>
      )}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto no-scrollbar">
        {NAV_GROUPS.map(group => {
          const isClosed = closedGroups.has(group.group);
          const contentId = groupId(group.group, "mobile");
          return (
            <div key={group.group}>
              <button
                type="button"
                onClick={() => toggleGroup(group.group)}
                aria-expanded={!isClosed}
                aria-controls={contentId}
                className="w-full flex items-center justify-between px-3 mb-1 group"
              >
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#4D6B8A] group-hover:text-[#8BA3C1] transition-colors">
                  {group.group}
                </span>
                <svg className={`w-3 h-3 text-[#4D6B8A] group-hover:text-[#8BA3C1] transition-all duration-200 ${isClosed ? "-rotate-90" : "rotate-0"}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {!isClosed && (
                  <motion.div
                    id={contentId}
                    key="links"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-0.5 pb-1">
                      {group.links.map(link => {
                        const isActive = pathname === link.href;
                        return (
                          <Link key={link.href} href={link.href} {...(onLinkClick && { onClick: onLinkClick })}
                            className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                              isActive ? "nav-active text-[#38B6FF]" : "text-[#8BA3C1] hover:text-[#F0F6FF] hover:bg-[#112040]"
                            }`}>
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
      <div className="px-3 py-4 pb-safe border-t border-[#1E3A5F]">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse shrink-0" />
          <span className="text-xs text-[#4D6B8A]">All systems nominal</span>
        </div>
        <p className="px-3 text-[10px] font-semibold tracking-widest text-[#4D6B8A]/60 uppercase mt-1 mb-2">
          Ancol 360° CDP v1.0
        </p>
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium text-[#4D6B8A] hover:text-[#F0F6FF] hover:bg-[#112040] transition-all duration-200 rounded-xl"
        >
          {theme === "dark" ? (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M18.364 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>
    </>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = () => {
    setIsOpen(false);
    // Restore focus to the trigger button after drawer closes
    setTimeout(() => hamburgerRef.current?.focus(), 50);
  };

  return (
    <>
      {/* ── Desktop sidebar (with collapse) ── */}
      <DesktopSidebar pathname={pathname} />

      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 py-3 bg-[#0C1830]/95 backdrop-blur-xl border-b border-[#1E3A5F]">
        <Link href="/" className="text-base font-bold text-[#F0F6FF]">
          Ancol 360°{"\u200B"}
        </Link>
        <motion.button
          ref={hamburgerRef}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.93 }}
          className="w-12 h-12 flex items-center justify-center rounded-xl text-[#8BA3C1] hover:text-[#F0F6FF] hover:bg-[#112040] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer} />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer (with focus trap) ── */}
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          escapeDeactivates: true,
          onDeactivate: closeDrawer,
          allowOutsideClick: true,
        }}
      >
        <div
          id="mobile-nav-drawer"
          role={isOpen ? "dialog" : undefined}
          aria-modal={isOpen ? "true" : undefined}
          aria-label="Navigation menu"
          className={`md:hidden fixed top-0 left-0 z-[80] h-full w-[min(280px,85vw)] flex flex-col bg-[#0C1830] border-r border-[#1E3A5F] overflow-hidden transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E3A5F]">
            <span className="text-base font-bold text-[#F0F6FF]">Ancol 360°</span>
            <button aria-label="Close navigation menu" onClick={closeDrawer}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-[#8BA3C1] hover:text-[#F0F6FF] hover:bg-[#112040] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <MobileNavContent pathname={pathname} onLinkClick={closeDrawer} />
        </div>
      </FocusTrap>
    </>
  );
}
