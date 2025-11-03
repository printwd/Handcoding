import { describe, it, expect } from "vitest";

// Levenshtein distance function from OCRDemo
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

describe("levenshteinDistance", () => {
  it("should return 0 for identical strings", () => {
    expect(levenshteinDistance("hello", "hello")).toBe(0);
    expect(levenshteinDistance("test", "test")).toBe(0);
  });

  it("should return correct distance for single character difference", () => {
    expect(levenshteinDistance("hello", "hallo")).toBe(1);
    expect(levenshteinDistance("test", "text")).toBe(1);
  });

  it("should handle empty strings", () => {
    expect(levenshteinDistance("", "")).toBe(0);
    expect(levenshteinDistance("hello", "")).toBe(5);
    expect(levenshteinDistance("", "world")).toBe(5);
  });

  it("should calculate distance for different length strings", () => {
    expect(levenshteinDistance("cat", "cats")).toBe(1);
    expect(levenshteinDistance("kitten", "sitting")).toBe(3);
  });

  it("should handle complete string replacement", () => {
    expect(levenshteinDistance("abc", "xyz")).toBe(3);
  });

  it("should be case-sensitive", () => {
    expect(levenshteinDistance("Hello", "hello")).toBe(1);
  });

  // Code matching scenarios
  describe("code matching scenarios", () => {
    it("should detect typos in Java keywords", () => {
      expect(levenshteinDistance("System", "Systen")).toBe(1); // typo
      expect(levenshteinDistance("println", "printl")).toBe(1); // missing 'n' - distance is 1 (delete 'n')
    });

    it("should calculate distance for similar variable names", () => {
      expect(levenshteinDistance("sum", "sam")).toBe(1);
      expect(levenshteinDistance("name", "names")).toBe(1);
    });
  });
});
