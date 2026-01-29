import styled from 'styled-components/native'

export const StyledViewContainer = styled.View`
  border-width: 1px;
  border-color: ${(props) => props.theme.uikit['border-basic-color-4']};
  border-radius: ${(props) => props.theme.uikit['border-radius-sm']};
  padding: ${(props) => props.theme.uikit['spacing-md']};
  margin-horizontal: ${(props) => props.theme.uikit['spacing-md']};
  margin-bottom: ${(props) => props.theme.uikit.gap};
`
