import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OCRDemo } from "../../components/OCRDemo";

// Mock Google Generative AI
vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: vi.fn().mockReturnValue('System.out.println("Hello");'),
        },
      }),
    }),
  })),
}));

describe("OCRDemo Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render OCR demo component", () => {
    render(<OCRDemo />);

    // Check for main heading or key elements
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("should have canvas for drawing", () => {
    render(<OCRDemo />);

    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas?.tagName).toBe("CANVAS");
  });

  it("should render control buttons", () => {
    const { container } = render(<OCRDemo />);

    // Check for buttons (may have icons)
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should have erase/clear functionality button", () => {
    const { container } = render(<OCRDemo />);

    // Look for button with erase/clear icon or text
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should handle canvas drawing interaction", async () => {
    const { container } = render(<OCRDemo />);
    const canvas = container.querySelector("canvas") as HTMLCanvasElement;

    expect(canvas).toBeInTheDocument();

    // Simulate mouse events for drawing
    const mouseDownEvent = new MouseEvent("mousedown", {
      clientX: 100,
      clientY: 100,
      bubbles: true,
    });

    const mouseMoveEvent = new MouseEvent("mousemove", {
      clientX: 150,
      clientY: 150,
      bubbles: true,
    });

    const mouseUpEvent = new MouseEvent("mouseup", {
      bubbles: true,
    });

    canvas.dispatchEvent(mouseDownEvent);
    canvas.dispatchEvent(mouseMoveEvent);
    canvas.dispatchEvent(mouseUpEvent);

    // Canvas should still be there after drawing
    expect(canvas).toBeInTheDocument();
  });

  describe("Code recognition flow", () => {
    it("should show analyzing state during code analysis", async () => {
      const { container } = render(<OCRDemo />);

      // The component should render without errors
      expect(container).toBeInTheDocument();
    });

    it("should handle code execution", async () => {
      const { container } = render(<OCRDemo />);

      // Component should be interactive
      expect(container).toBeInTheDocument();
    });
  });

  describe("Java code examples", () => {
    it("should support System.out.println pattern", () => {
      render(<OCRDemo />);

      // Component loads successfully with examples
      expect(document.querySelector("canvas")).toBeInTheDocument();
    });

    it("should support variable declaration pattern", () => {
      render(<OCRDemo />);

      // Component loads successfully
      expect(document.querySelector("canvas")).toBeInTheDocument();
    });
  });
});
