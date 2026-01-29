import { SpacingNames } from "@/types/theme";
import { ViewStyle } from "react-native";
import styled from "styled-components/native";

export const StyledCardContainerView = styled.View<{
  spacingTop: SpacingNames;
  spacingBottom: SpacingNames;
  overflow?: ViewStyle["overflow"];
  paddingBottom: SpacingNames;
}>`
  margin-top: ${(props) => props.theme.spacing[props.spacingTop]}px;
  margin-bottom: ${(props) => props.theme.spacing[props.spacingBottom]}px;
  overflow: ${(props) => props.overflow ?? "hidden"};
  padding-bottom: ${(props) => props.theme.spacing[props.paddingBottom]}px;
`;

export const StyledCard = styled.View<{
  color: string;
  borderColor: string;
  borderRadius: SpacingNames;
  paddingVertical: SpacingNames;
  paddingHorizontal: SpacingNames;
  fillHeight: boolean;
  hideShadow: boolean;
  showTopRadius: boolean;
  showBottomRadius: boolean;
  overflow?: ViewStyle["overflow"];
}>`
  padding-vertical: ${(props) => props.theme.spacing[props.paddingVertical]}px;
  padding-horizontal: ${(props) =>
    props.theme.spacing[props.paddingHorizontal]}px;
  width: 100%;
  background-color: ${(props) => props.theme.colors[props.color]};
  border: ${(props) => props.theme.colors[props.borderColor]};
  border-top-left-radius: ${(props) =>
    props.theme.spacing[props.showTopRadius ? props.borderRadius : "none"]}px;
  border-top-right-radius: ${(props) =>
    props.theme.spacing[props.showTopRadius ? props.borderRadius : "none"]}px;
  border-bottom-left-radius: ${(props) =>
    props.theme.spacing[
      props.showBottomRadius ? props.borderRadius : "none"
    ]}px;
  border-bottom-right-radius: ${(props) =>
    props.theme.spacing[
      props.showBottomRadius ? props.borderRadius : "none"
    ]}px;
  flex-grow: ${(props) => (props.fillHeight ? 1 : 0)}px;
  shadow-color: ${(props) => props.theme.colors["color-basic-900"]};
  shadow-offset: ${(props) => (props.hideShadow ? "0 0" : "0px 4px")};
  shadow-opacity: ${(props) => (props.hideShadow ? "0" : "0.15")};
  shadow-radius: ${(props) => (props.hideShadow ? "0" : "8px")};
  elevation: ${(props) => (props.hideShadow ? 0 : 3)};
  overflow: ${(props) => props.overflow || "hidden"};
`;
