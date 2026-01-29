import { PathProps, RectProps } from 'react-native-svg'

export interface SVGIconProps {
  name: string
  color?: string
  width?: string | number
  height?: string | number
}

export type Children =
  | {
      type: 'rect'
      properties: RectProps
    }
  | {
      type: 'path'
      properties: PathProps
    }

export interface SVGInfo {
  viewBox: string
  children: Children[]
}
