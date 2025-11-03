import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("App Integration", () => {
  it("should render the main app structure", () => {
    render(<App />);

    // Check if main container exists (use class selector instead of role)
    const mainContainer = document.querySelector(
      ".relative.overflow-hidden.bg-white"
    );
    expect(mainContainer).toBeInTheDocument();
  });

  it("should render all major sections", () => {
    const { container } = render(<App />);

    // Check for footer
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("should render footer content", () => {
    render(<App />);

    // Check for footer text
    expect(screen.getByText(/초보탈출 손코딩/i)).toBeInTheDocument();
    expect(screen.getByText(/2025 손코딩랩/i)).toBeInTheDocument();
    expect(
      screen.getByText(/비전공자를 위한 손코딩 학습 플랫폼/i)
    ).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(<App />);

    expect(screen.getByText(/suhodang77@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/@손코딩랩/i)).toBeInTheDocument();
  });

  it("should render service menu items", () => {
    render(<App />);

    // Use getAllByText for items that appear multiple times
    expect(screen.getAllByText(/커리큘럼/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/무료 체험/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/학습 가이드/i)).toBeInTheDocument();
  });
});
