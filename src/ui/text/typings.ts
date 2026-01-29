import {
  ColorNames,
  SpacingNames,
  TextAlignType,
  TypographyVariant,
} from "@/types/theme";
import { TextProps as RNTextProps } from "react-native";

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  size?: number;
  color?: ColorNames;
  align?: TextAlignType;
  i18n?: string;
  spacingBottom?: SpacingNames;
  /**
   * lineHeight will override the values from variant.
   */
  lineHeight?: number;
  /**
   * letterSpacing will override the values from variant.
   */
  letterSpacing?: number;
}
