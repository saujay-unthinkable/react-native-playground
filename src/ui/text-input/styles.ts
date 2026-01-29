import { SpacingNames } from "@/types/theme";
import styled from "styled-components/native";

export const TextInputContainer = styled.View<{ marginBottom: SpacingNames }>`
  width: 100%;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.marginBottom || "none"]};
`;
