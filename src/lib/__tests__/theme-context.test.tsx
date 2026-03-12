import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "../theme-context";

function ThemeConsumer() {
  const { theme, toggle } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to dark when localStorage is empty", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("reads stored theme from localStorage on mount", () => {
    localStorage.setItem("cdp-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  it("toggles from dark to light and persists to localStorage", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByTestId("theme").textContent).toBe("light");
    expect(localStorage.getItem("cdp-theme")).toBe("light");
  });

  it("toggles from light back to dark", async () => {
    localStorage.setItem("cdp-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(localStorage.getItem("cdp-theme")).toBe("dark");
  });

  it("sets data-theme attribute on documentElement when toggling", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
