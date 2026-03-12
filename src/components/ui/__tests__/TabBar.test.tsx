import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TabBar from "../TabBar";

const TABS = [
  { id: "a", label: "Alpha" },
  { id: "b", label: "Beta" },
  { id: "c", label: "Gamma" },
];

describe("TabBar", () => {
  it("renders all tabs with correct roles", () => {
    const onTabChange = vi.fn();
    render(<TabBar tabs={TABS} activeTab="a" onTabChange={onTabChange} />);
    const buttons = screen.getAllByRole("tab");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveAttribute("aria-selected", "true");
    expect(buttons[1]).toHaveAttribute("aria-selected", "false");
  });

  it("calls onTabChange when a tab is clicked", async () => {
    const onTabChange = vi.fn();
    render(<TabBar tabs={TABS} activeTab="a" onTabChange={onTabChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Beta" }));
    expect(onTabChange).toHaveBeenCalledWith("b");
  });

  it("ArrowRight moves focus to next tab", async () => {
    const onTabChange = vi.fn();
    render(<TabBar tabs={TABS} activeTab="a" onTabChange={onTabChange} />);
    const firstTab = screen.getByRole("tab", { name: "Alpha" });
    firstTab.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveFocus();
  });

  it("ArrowLeft moves focus to previous tab", async () => {
    const onTabChange = vi.fn();
    render(<TabBar tabs={TABS} activeTab="b" onTabChange={onTabChange} />);
    const secondTab = screen.getByRole("tab", { name: "Beta" });
    secondTab.focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();
  });

  it("ArrowRight wraps from last to first tab", async () => {
    const onTabChange = vi.fn();
    render(<TabBar tabs={TABS} activeTab="c" onTabChange={onTabChange} />);
    const lastTab = screen.getByRole("tab", { name: "Gamma" });
    lastTab.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();
  });

  it("ArrowLeft wraps from first to last tab", async () => {
    const onTabChange = vi.fn();
    render(<TabBar tabs={TABS} activeTab="a" onTabChange={onTabChange} />);
    const firstTab = screen.getByRole("tab", { name: "Alpha" });
    firstTab.focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Gamma" })).toHaveFocus();
  });
});
