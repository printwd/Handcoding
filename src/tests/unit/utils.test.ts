import { describe, it, expect } from "vitest";
import { cn } from "../../components/ui/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("btn", "btn-primary");
    expect(result).toBe("btn btn-primary");
  });

  it("should handle conditional classes", () => {
    const result = cn("btn", false && "hidden", "visible");
    expect(result).toBe("btn visible");
  });

  it("should merge tailwind classes with conflicts", () => {
    // twMerge should keep the last conflicting class
    const result = cn("px-2", "px-4");
    expect(result).toBe("px-4");
  });

  it("should handle undefined and null values", () => {
    const result = cn("btn", undefined, null, "active");
    expect(result).toBe("btn active");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["btn", "btn-primary"], "active");
    expect(result).toBe("btn btn-primary active");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({
      btn: true,
      "btn-primary": true,
      hidden: false,
    });
    expect(result).toBe("btn btn-primary");
  });
});
