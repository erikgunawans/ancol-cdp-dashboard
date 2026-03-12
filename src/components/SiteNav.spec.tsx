import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
}));
vi.mock("focus-trap-react", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...p}>{children}</div>
    ),
    button: ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...p}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("@heroicons/react/24/outline", () => ({
  SunIcon: () => <svg data-testid="sun-icon" />,
  MoonIcon: () => <svg data-testid="moon-icon" />,
}));
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...p
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...p}>
      {children}
    </a>
  ),
}));

import SiteNav from "./SiteNav";

describe("SiteNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the brand logo link", () => {
    render(<SiteNav />);
    expect(screen.getByText("Ancol 360°")).toBeInTheDocument();
  });

  it("should have an accessible open-menu button with aria-label", () => {
    render(<SiteNav />);
    expect(
      screen.getByRole("button", { name: /open navigation menu/i })
    ).toBeInTheDocument();
  });

  it("should open mobile drawer with role=dialog and aria-modal when hamburger clicked", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    const menuBtn = screen.getByRole("button", { name: /open navigation menu/i });
    await user.click(menuBtn);

    // RED: drawer currently has no role="dialog"
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label");
  });

  it("should close drawer when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));
    const closeBtn = screen.getByRole("button", { name: /close navigation menu/i });
    await user.click(closeBtn);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
