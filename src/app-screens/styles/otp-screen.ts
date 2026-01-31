import styled from "styled-components/native";

export const StyledSignupView = styled.View`
  flex: 1;
`;

export const StyledBrandView = styled.View`
  flex: 1;
`;

export const StyledFormView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors["color-neutral-100"]};
  padding: 16px;
`;

export const StyledNavigationBarView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const StyledMobileInfoView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;
