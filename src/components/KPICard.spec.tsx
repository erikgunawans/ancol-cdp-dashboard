import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...p}>{children}</div>
    ),
  },
}));

import KPICard from "./KPICard";

const baseProps = {
  label: "Annual Visitors",
  value: "10M+",
  delta: "+8.2%",
  deltaPositive: true,
};

describe("KPICard", () => {
  it("should render the label text", () => {
    render(<KPICard {...baseProps} />);
    expect(screen.getByText("Annual Visitors")).toBeInTheDocument();
  });

  it("should render the value", () => {
    render(<KPICard {...baseProps} />);
    expect(screen.getByText("10M+")).toBeInTheDocument();
  });

  it("should render the delta badge with positive styling", () => {
    render(<KPICard {...baseProps} />);
    const delta = screen.getByText("+8.2%");
    expect(delta).toBeInTheDocument();
    expect(delta.className).toContain("text-[#34C759]");
  });

  it("should render negative delta with crimson styling", () => {
    render(<KPICard {...baseProps} delta="-3.1%" deltaPositive={false} />);
    const delta = screen.getByText("-3.1%");
    expect(delta.className).toContain("text-[#C41E3A]");
  });

  it("should render unit when provided", () => {
    render(<KPICard {...baseProps} unit="IDR Billion" />);
    expect(screen.getByText("IDR Billion")).toBeInTheDocument();
  });

  it("should not render unit element when unit is not provided", () => {
    render(<KPICard {...baseProps} />);
    expect(screen.queryByText("IDR Billion")).not.toBeInTheDocument();
  });
});
