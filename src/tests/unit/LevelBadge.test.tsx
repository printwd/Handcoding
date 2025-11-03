import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LevelBadge } from "../../components/LevelBadge";

describe("LevelBadge Component", () => {
  const mockLevelData = {
    level: 1,
    title: "코딩 새싹",
    emoji: "🌱",
    color: "bg-gradient-to-br from-green-300 to-green-400",
  };

  it("should render level badge with correct level number", () => {
    const { container } = render(<LevelBadge {...mockLevelData} />);
    // Text is split across elements: "레벨" and "1"
    expect(screen.getByText(/레벨/i)).toBeInTheDocument();
    // Use regex or container.textContent to find the number
    expect(container.textContent).toContain("1");
  });

  it("should render level title", () => {
    render(<LevelBadge {...mockLevelData} />);
    expect(screen.getByText("코딩 새싹")).toBeInTheDocument();
  });

  it("should render emoji", () => {
    render(<LevelBadge {...mockLevelData} />);
    expect(screen.getByText("🌱")).toBeInTheDocument();
  });

  it("should apply color gradient class", () => {
    const { container } = render(<LevelBadge {...mockLevelData} />);
    const badge = container.querySelector(".bg-gradient-to-br");
    expect(badge).toBeInTheDocument();
  });

  it("should render different levels correctly", () => {
    const levels = [
      { level: 1, title: "코딩 새싹", emoji: "🌱", color: "bg-green-300" },
      { level: 2, title: "코딩 친구", emoji: "😊", color: "bg-blue-300" },
      { level: 3, title: "코딩 달인", emoji: "🎯", color: "bg-purple-300" },
      { level: 4, title: "코딩 마스터", emoji: "⭐", color: "bg-yellow-300" },
      { level: 5, title: "코딩 천재", emoji: "👑", color: "bg-pink-300" },
    ];

    levels.forEach((level) => {
      const { container, unmount } = render(<LevelBadge {...level} />);
      // Check for "레벨" text and level number in content
      expect(screen.getByText(/레벨/i)).toBeInTheDocument();
      expect(container.textContent).toContain(level.level.toString());
      expect(screen.getByText(level.title)).toBeInTheDocument();
      expect(screen.getByText(level.emoji)).toBeInTheDocument();
      unmount(); // Clean up before next iteration
    });
  });
});
