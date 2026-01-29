import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { DefaultTheme } from "styled-components/native";
import colors from "./colors";

export const spacing = {
  none: 0,
  xxxs: 1,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
  xxxl: 20,
  xxxxl: 24,
  xxxxxl: 32,
};

export const customFonts = {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
};

export const lightTheme: DefaultTheme = {
  colors: {
    ...colors.light,
  },
  spacing,
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: colors.dark.tint,
    secondary: "#888",
    background: colors.dark.background,
    text: colors.dark.text,
    tint: colors.dark.tint,
    tabIconDefault: colors.dark.tabIconDefault,
    tabIconSelected: colors.dark.tabIconSelected,
  },
  spacing,
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
};
