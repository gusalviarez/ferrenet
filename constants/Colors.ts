export const BrandColors = {
  primary: "#0D72FF",
  primaryLight: "#66A3FF",
  primaryDark: "#084499",
  secondary: "#0EA5E9",
  secondaryLight: "#7DD3FC",
  secondaryDark: "#0369A1",
  accent: "#22C55E",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  error: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
};

const tintColorLight = "#0D72FF";
const tintColorDark = "#3385FF";

export default {
  light: {
    text: "#0F172A",
    textSecondary: "#475569",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    tint: tintColorLight,
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    background: "#0F172A",
    surface: "#1E293B",
    tint: tintColorDark,
    tabIconDefault: "#475569",
    tabIconSelected: tintColorDark,
  },
};
