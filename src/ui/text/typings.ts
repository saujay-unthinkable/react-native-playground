import { SpacingNames, TextAlignType, TypographyVariant } from "@/types/theme";
import { TextProps as RNTextProps } from "react-native";

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  size?: number;
  color?: string;
  align?: TextAlignType;
  i18n?: string;
  spacingBottom?: SpacingNames;
  spacingTop?: SpacingNames;
  spacingLeft?: SpacingNames;
  spacingRight?: SpacingNames;
  /**
   * lineHeight will override the values from variant.
   */
  lineHeight?: number;
  /**
   * letterSpacing will override the values from variant.
   */
  letterSpacing?: number;
}
