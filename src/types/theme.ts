import { TextStyle } from "react-native";

export interface TypographyStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: TextStyle["fontWeight"];
  fontFamily: string;
  letterSpacing?: number;
}

export interface BodyVariantByWeight {
  regular: TypographyStyle;
  medium: TypographyStyle;
  semiBold: TypographyStyle;
}
export interface Typography {
  // Headings with multiple weight variants
  h1: {
    bold: TypographyStyle;
    semiBold: TypographyStyle;
    medium: TypographyStyle;
  };
  h2: {
    bold: TypographyStyle;
    semiBold: TypographyStyle;
    medium: TypographyStyle;
  };
  h3: {
    semiBold: TypographyStyle;
    medium: TypographyStyle;
    regular: TypographyStyle;
  };
  h4: {
    semiBold: TypographyStyle;
    medium: TypographyStyle;
    regular: TypographyStyle;
  };

  // Body text variants
  body_xl: BodyVariantByWeight;
  body_lg: BodyVariantByWeight;
  body_md: BodyVariantByWeight;
  body_sm: BodyVariantByWeight;
  body_xs: BodyVariantByWeight;
  body_xxs: BodyVariantByWeight;
}

export interface HeaderFontFamilyByWeight {
  regular: string;
  medium: string;
  bold: string;
  semiBold: string;
}

export interface BodyFontFamilyByWeight {
  regular: string;
  medium: string;
  semiBold: string;
}

// Font families interface
export interface FontFamilies {
  header: HeaderFontFamilyByWeight;
  body: BodyFontFamilyByWeight;
}

export interface FontWeights {
  regular: "400";
  medium: "500";
  semiBold: "600";
  bold: "700";
}

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";

export type HeadingWeight = "bold" | "semiBold" | "medium" | "regular";

export type BodyLevel =
  | "body_xl"
  | "body_lg"
  | "body_md"
  | "body_sm"
  | "body_xs"
  | "body_xxs";

export type BodyWeight = "regular" | "medium" | "semiBold";

// Union type for all typography variants
export type TypographyVariant =
  | `${HeadingLevel}.${HeadingWeight}`
  | `${BodyLevel}.${BodyWeight}`;

export type TextAlignType = TextStyle["textAlign"];

export interface Spacing {
  none: number;
  xxxs: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  xxxxl: number;
  xxxxxl: number;
}

export type SpacingNames = keyof Spacing;

export type ColorVariant =
  | "primary"
  | "neutral"
  | "warning"
  | "danger"
  | "success";

export type ColorRange =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "800";

export type ColorNames =
  | `color-${ColorVariant}-${ColorRange}`
  | "text"
  | "background"
  | "tint"
  | "tintColorLight"
  | "tabIconDefault"
  | "tabIconSelected";
