import { typography } from "@/theme";
import { TypographyStyle, TypographyVariant } from "@/types/theme";
import { get } from "lodash";

export const getTypographyStyle = (
  variant: TypographyVariant,
): TypographyStyle => {
  return get(typography, variant, typography.body_md.medium);
};
