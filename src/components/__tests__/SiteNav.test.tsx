import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import React from "react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

const FILTERED = new Set([
  "initial", "animate", "exit", "transition", "custom", "variants",
  "whileTap", "whileHover", "whileFocus", "layoutId", "layout",
  "onAnimationStart", "onAnimationComplete",
]);

function makeMotion(tag: keyof React.JSX.IntrinsicElements) {
  return function MotionEl({
    children,
    ...rest
  }: React.HTMLAttributes<HTMLElement> & { [k: string]: unknown }) {
    const safe = Object.fromEntries(Object.entries(rest).filter(([k]) => !FILTERED.has(k)));
    return React.createElement(tag, safe, children);
  };
}

vi.mock("framer-motion", () => ({
  motion: {
    div: makeMotion("div"),
    button: makeMotion("button"),
    nav: makeMotion("nav"),
    span: makeMotion("span"),
    ul: makeMotion("ul"),
    li: makeMotion("li"),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useInView: () => true,
}));

vi.mock("focus-trap-react", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

import SiteNav from "../SiteNav";

describe("SiteNav mobile drawer", () => {
  it("hamburger button has aria-expanded=false when drawer is closed", () => {
    render(<SiteNav />);
    const hamburger = screen.getByRole("button", { name: "Open navigation menu" });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
    expect(hamburger).toHaveAttribute("aria-controls", "mobile-nav-drawer");
  });

  it("opens drawer when hamburger is clicked", async () => {
    render(<SiteNav />);
    const hamburger = screen.getByRole("button", { name: "Open navigation menu" });
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toBeTruthy();
  });

  it("closes drawer when close button is clicked", async () => {
    render(<SiteNav />);
    await userEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    await userEvent.click(screen.getByRole("button", { name: "Close navigation menu" }));
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Open navigation menu" })
      ).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("calls focus on hamburger after drawer closes", async () => {
    const focusSpy = vi.spyOn(HTMLButtonElement.prototype, "focus");
    render(<SiteNav />);
    await userEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    focusSpy.mockClear();
    await userEvent.click(screen.getByRole("button", { name: "Close navigation menu" }));
    await waitFor(() => {
      expect(focusSpy).toHaveBeenCalled();
    }, { timeout: 500 });
    focusSpy.mockRestore();
  });
});
