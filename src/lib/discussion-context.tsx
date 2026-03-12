"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface DiscussionContextType {
  selected: Set<string>;
  toggle: (id: string) => void;
  isSelected: (id: string) => boolean;
  clear: () => void;
}

const DiscussionContext = createContext<DiscussionContextType | null>(null);

export function DiscussionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cdp-discussion");
      if (stored) setSelected(new Set(JSON.parse(stored) as string[]));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem("cdp-discussion", JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const isSelected = (id: string) => selected.has(id);

  const clear = () => {
    setSelected(new Set());
    try { localStorage.removeItem("cdp-discussion"); } catch {}
  };

  return (
    <DiscussionContext.Provider value={{ selected, toggle, isSelected, clear }}>
      {children}
    </DiscussionContext.Provider>
  );
}

export function useDiscussion() {
  const ctx = useContext(DiscussionContext);
  if (!ctx) throw new Error("useDiscussion must be used within DiscussionProvider");
  return ctx;
}
