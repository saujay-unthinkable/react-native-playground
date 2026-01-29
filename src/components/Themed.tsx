/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";
import styled from "styled-components/native";

import Colors from "@/constants/colors";
import { useColorScheme } from "./useColorScheme";

// Type for our theme
type AppTheme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
};

// Helper to avoid typing theme each time
export const themeHelper =
  (fn: (theme: AppTheme) => string | number) =>
  ({ theme }: { theme: AppTheme }) =>
    fn(theme);

// Typed styled components using themeHelper
export const StyledView = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => `${props.theme.spacing.md}px`};
  border-radius: ${(props) => `${props.theme.borderRadius.medium}px`};
`;

export const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  font-weight: 500;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => `${props.theme.spacing.md}px`};
  border-radius: ${(props) => `${props.theme.borderRadius.medium}px`};
  align-items: center;
  justify-content: center;
`;

export const StyledButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: 16px;
  font-weight: bold;
`;
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
