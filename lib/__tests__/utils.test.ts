import { describe, it, expect } from "vitest";
import { getLevelColor, getSeverityColor, LANGUAGES } from "../utils";

describe("getLevelColor", () => {
  it("maps ERROR to destructive", () => {
    expect(getLevelColor("ERROR")).toBe("destructive");
  });

  it("maps WARNING to warning", () => {
    expect(getLevelColor("WARNING")).toBe("warning");
  });

  it("maps INFO to default", () => {
    expect(getLevelColor("INFO")).toBe("default");
  });

  it("maps DEBUG to secondary", () => {
    expect(getLevelColor("DEBUG")).toBe("secondary");
  });
});

describe("getSeverityColor", () => {
  it("maps CRITICAL to destructive", () => {
    expect(getSeverityColor("CRITICAL")).toBe("destructive");
  });

  it("maps HIGH to warning", () => {
    expect(getSeverityColor("HIGH")).toBe("warning");
  });

  it("maps MEDIUM to default", () => {
    expect(getSeverityColor("MEDIUM")).toBe("default");
  });

  it("maps LOW to secondary", () => {
    expect(getSeverityColor("LOW")).toBe("secondary");
  });
});

describe("LANGUAGES", () => {
  it("has 6 supported languages", () => {
    expect(LANGUAGES).toHaveLength(6);
  });

  it("includes all required language codes", () => {
    const codes = LANGUAGES.map((l) => l.code);
    expect(codes).toContain("en");
    expect(codes).toContain("es");
    expect(codes).toContain("fr");
    expect(codes).toContain("de");
    expect(codes).toContain("ja");
    expect(codes).toContain("zh");
  });

  it("each language has code, name, and flag", () => {
    for (const lang of LANGUAGES) {
      expect(lang.code).toBeDefined();
      expect(lang.name).toBeDefined();
      expect(lang.flag).toBeDefined();
    }
  });
});
