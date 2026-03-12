import { render, screen, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import MermaidDiagram from "../MermaidDiagram";

vi.mock("mermaid", () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn(),
  },
}));

vi.mock("dompurify", () => ({
  default: {
    sanitize: (html: string) => html,
  },
}));

import mermaid from "mermaid";

describe("MermaidDiagram", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading skeleton initially", () => {
    (mermaid.render as Mock).mockReturnValue(new Promise(() => {}));
    const { container } = render(<MermaidDiagram chart="graph TD; A-->B" />);
    expect(container.querySelector(".animate-pulse")).toBeTruthy();
  });

  it("hides skeleton and renders SVG on success", async () => {
    (mermaid.render as Mock).mockResolvedValue({ svg: "<svg><text>ok</text></svg>" });
    const { container } = render(<MermaidDiagram chart="graph TD; A-->B" />);
    await waitFor(() => {
      expect(container.querySelector(".animate-pulse")).toBeNull();
    });
  });

  it("shows error fallback and hides skeleton on render failure", async () => {
    (mermaid.render as Mock).mockRejectedValue(new Error("parse error"));
    render(<MermaidDiagram chart="invalid chart $$$$" />);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeTruthy();
    });
    expect(screen.getByText("Diagram unavailable")).toBeTruthy();
  });

  it("error fallback message does not leak raw error to DOM", async () => {
    (mermaid.render as Mock).mockRejectedValue(new Error("parse error"));
    render(<MermaidDiagram chart="bad" />);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeTruthy();
    });
    expect(screen.queryByText("parse error")).toBeNull();
  });
});
