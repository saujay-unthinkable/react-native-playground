import { useColorScheme } from "@/components/useColorScheme";
import { darkTheme, lightTheme } from "@/constants/theme";
import React, { FC } from "react";
import { ThemeProvider } from "styled-components/native";

const StyledThemeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();

  const currentTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={{ ...currentTheme }}>{children}</ThemeProvider>;
};

export default StyledThemeProvider;
