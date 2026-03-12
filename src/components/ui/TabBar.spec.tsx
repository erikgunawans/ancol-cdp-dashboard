import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TabBar from "./TabBar";

const TABS = [
  { id: "alpha", label: "Alpha" },
  { id: "beta",  label: "Beta"  },
  { id: "gamma", label: "Gamma" },
] as const;

describe("TabBar", () => {
  it("renders a tablist with correct role", () => {
    render(<TabBar tabs={TABS} activeTab="alpha" onTabChange={vi.fn()} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders each tab with role='tab'", () => {
    render(<TabBar tabs={TABS} activeTab="alpha" onTabChange={vi.fn()} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
  });

  it("marks active tab with aria-selected='true'", () => {
    render(<TabBar tabs={TABS} activeTab="beta" onTabChange={vi.fn()} />);
    const betaTab = screen.getByRole("tab", { name: "Beta" });
    expect(betaTab).toHaveAttribute("aria-selected", "true");
  });

  it("marks inactive tabs with aria-selected='false'", () => {
    render(<TabBar tabs={TABS} activeTab="alpha" onTabChange={vi.fn()} />);
    const betaTab = screen.getByRole("tab", { name: "Beta" });
    expect(betaTab).toHaveAttribute("aria-selected", "false");
  });

  it("calls onTabChange with tab id when clicked", async () => {
    const onTabChange = vi.fn();
    render(<TabBar tabs={TABS} activeTab="alpha" onTabChange={onTabChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Gamma" }));
    expect(onTabChange).toHaveBeenCalledWith("gamma");
  });

  it("moves focus with ArrowRight key", async () => {
    render(<TabBar tabs={TABS} activeTab="alpha" onTabChange={vi.fn()} />);
    const alphaTab = screen.getByRole("tab", { name: "Alpha" });
    alphaTab.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveFocus();
  });

  it("wraps focus from last tab to first on ArrowRight", async () => {
    render(<TabBar tabs={TABS} activeTab="alpha" onTabChange={vi.fn()} />);
    const gammaTab = screen.getByRole("tab", { name: "Gamma" });
    gammaTab.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();
  });

  it("moves focus with ArrowLeft key", async () => {
    render(<TabBar tabs={TABS} activeTab="alpha" onTabChange={vi.fn()} />);
    const betaTab = screen.getByRole("tab", { name: "Beta" });
    betaTab.focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();
  });
});
