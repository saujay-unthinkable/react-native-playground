import "styled-components/native";
import { Spacing } from "./theme";

interface Colors {
  [index: string]: string;
}

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: Colors;
    spacing: Spacing;
    borderRadius: {
      small: number;
      medium: number;
      large: number;
    };
  }
}
