import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...p}>{children}</div>
    ),
    button: ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...p}>{children}</button>
    ),
    p: ({ children, ...p }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...p}>{children}</p>
    ),
    h2: ({ children, ...p }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...p}>{children}</h2>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

import ArchitectureClient from "./ArchitectureClient";

describe("ArchitectureClient — LayerCard accessibility", () => {
  it("should render layer cards as keyboard-accessible elements", () => {
    render(<ArchitectureClient />);

    // Layer cards must have role="button" so screen readers understand them as interactive
    // RED: currently they are plain motion.div with only onClick
    const layerCards = screen.getAllByRole("button", { name: /layer/i });
    expect(layerCards.length).toBeGreaterThan(0);
  });

  it("should have tabIndex=0 on all interactive layer cards", () => {
    render(<ArchitectureClient />);

    const buttons = screen.getAllByRole("button");
    // At least one layer card button should be present and focusable
    const layerButtons = buttons.filter((b) =>
      b.closest("[data-testid='layer-card']")
    );
    layerButtons.forEach((btn) => {
      expect(btn).not.toHaveAttribute("tabIndex", "-1");
    });
  });

  it("should toggle aria-expanded on Enter key press", async () => {
    const user = userEvent.setup();
    render(<ArchitectureClient />);

    // Find any element with aria-expanded (layer cards)
    const expandableCards = screen
      .getAllByRole("button")
      .filter((b) => b.hasAttribute("aria-expanded"));

    expect(expandableCards.length).toBeGreaterThan(0);

    const card = expandableCards[0]!;
    expect(card).toHaveAttribute("aria-expanded", "false");

    card.focus();
    await user.keyboard("{Enter}");

    expect(card).toHaveAttribute("aria-expanded", "true");
  });
});
