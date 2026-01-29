import { TypographyVariant } from "@/types/theme";
import { ButtonProps as RNEButtonProps } from "@rneui/base";

type OmittedProps = "iconRight" | "title";

export interface ButtonProps extends Omit<RNEButtonProps, OmittedProps> {
  i18n?: string;
  color?: string;
  full?: boolean;
  titleVariant?: TypographyVariant;
  titleColor?: string;
  borderColor?: string;
  buttonColor?: string;
  disabledButtonColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  spacingBottom?: number;
  spacingTop?: number;
}
