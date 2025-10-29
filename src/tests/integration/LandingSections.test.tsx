import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Hero } from "../../components/Hero";
import { EmpathySection } from "../../components/EmpathySection";
import { HowItWorksSection } from "../../components/HowItWorksSection";
import { StatsSection } from "../../components/StatsSection";

describe("Landing Page Sections Integration", () => {
  describe("Hero Section", () => {
    it("should render Hero section", () => {
      const { container } = render(<Hero />);
      expect(container).toBeInTheDocument();
    });

    it("should have gradient background", () => {
      const { container } = render(<Hero />);
      const gradientElement = container.querySelector(".bg-gradient-to-br");
      expect(gradientElement).toBeInTheDocument();
    });
  });

  describe("EmpathySection", () => {
    it("should render Empathy section", () => {
      const { container } = render(<EmpathySection />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("HowItWorksSection", () => {
    it("should render HowItWorks section", () => {
      const { container } = render(<HowItWorksSection />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("StatsSection", () => {
    it("should render Stats section", () => {
      const { container } = render(<StatsSection />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Multiple sections together", () => {
    it("should render Hero and Empathy sections in sequence", () => {
      const { container: container1 } = render(<Hero />);
      const { container: container2 } = render(<EmpathySection />);

      expect(container1).toBeInTheDocument();
      expect(container2).toBeInTheDocument();
    });
  });
});
