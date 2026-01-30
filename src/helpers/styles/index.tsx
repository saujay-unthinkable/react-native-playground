import { SpacingNames } from "@/types/theme";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import styled from "styled-components/native";

interface StyledSafeAreaViewProps extends SafeAreaViewProps {
  backgroundColor?: string;
}

export const StyledSafeAreaView = styled(
  SafeAreaView,
).attrs<StyledSafeAreaViewProps>((props) => ({
  edges: props.edges || ["left", "right", "top"],
}))`
  flex-grow: 1;
  background-color: ${(props) =>
    props.theme.colors[props.backgroundColor || "color-neutral-100"]};
`;

/**
 * `StyledPageWrapper` provides consistent treatment for the margin across the app. Should be used as the top enclosing component for any tab or page.
 */
export const StyledPageWrapper = styled.View<{
  spacingHorizontal?: SpacingNames;
  spacingBottom?: SpacingNames;
  spacingTop?: SpacingNames;
  paddingHorizontal?: SpacingNames;
}>`
  flex: 1;
  margin-top: ${(props) => props.theme.spacing[props.spacingTop || "none"]}px;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.spacingHorizontal || "md"]}px;
  margin-horizontal: ${(props) =>
    props.theme.spacing[props.spacingHorizontal || "md"]}px;
  padding-horizontal: ${(props) =>
    props.theme.spacing[props.paddingHorizontal || "none"]}px;
`;
