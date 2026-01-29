export type IconType = "font-awesome-5" | "image" | "svg";

export interface IconProps {
  name: string;
  color?: string;
  type?: IconType;
  onPress?: () => void;
  enableRotatingAnimation?: boolean;
  disabled?: boolean;

  /**
   * `size` works when the icon type if `font-awesome-5`.
   */
  size?: number;

  /**
   * `solid` works when the icon type is `font-awesome-5`.
   */
  solid?: boolean;

  /**
   * isGeneric works with image type, if true it will select image icon from the generic folder.
   */
  isGeneric?: boolean;

  /**
   * `height` is used for `image` and `svg` type only.
   */
  height?: string | number;

  /**
   * `width` is used for `image` and `svg` type only.
   */
  width?: string | number;
}

export interface RotatingIconProps {
  name: string;
  color?: string;
  type?: IconType;
  height?: string | number;
  width?: string | number;
}
