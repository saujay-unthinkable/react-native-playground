import React from 'react'

import { StyledCard, StyledCardContainerView } from './styles'
import { CardProps } from './typings'

const Card: React.FC<CardProps> = ({
  children,
  color = 'color-basic-100',
  borderColor = 'color-basic-300',
  radius = 'xs',
  paddingHorizontal = 'md',
  paddingVertical = 'sm',
  spacingBottom = 'none',
  spacingTop = 'none',
  fillHeight = false,
  hideShadow = false,
  showBottomRadius = true,
  showTopRadius = true,
  paddingBottom = 'none',
  overflow = 'hidden',
}) => {
  return (
    <StyledCardContainerView
      spacingTop={spacingTop}
      spacingBottom={spacingBottom}
      paddingBottom={paddingBottom}
      overflow={overflow}
    >
      <StyledCard
        color={color}
        borderColor={borderColor}
        borderRadius={radius}
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
        fillHeight={fillHeight}
        hideShadow={hideShadow}
        showBottomRadius={showBottomRadius}
        showTopRadius={showTopRadius}
        overflow={overflow}
      >
        {children}
      </StyledCard>
    </StyledCardContainerView>
  )
}

export default Card
