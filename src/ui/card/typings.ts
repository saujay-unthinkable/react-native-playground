import { SpacingNames } from "@/types/theme";
import React from "react";
import { ViewStyle } from "react-native";

export interface CardProps {
  children: React.ReactNode;
  marginBottom?: SpacingNames;
  color?: string;
  hideShadow?: boolean;
  borderColor?: string;
  radius?: SpacingNames;
  paddingHorizontal?: SpacingNames;
  paddingVertical?: SpacingNames;
  fillHeight?: boolean;
  spacingTop?: SpacingNames;
  spacingBottom?: SpacingNames;
  showTopRadius?: boolean;
  showBottomRadius?: boolean;
  paddingBottom?: SpacingNames;
  overflow?: ViewStyle["overflow"];
}
