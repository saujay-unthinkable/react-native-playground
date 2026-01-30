import { Input } from "@rneui/base";
import React, { FC, useEffect, useState } from "react";
import { BlurEvent, ColorValue, FocusEvent } from "react-native";

import { getTypographyStyle } from "@/helpers/theme";
import { t } from "@/services/i18n";
import { useTheme } from "styled-components/native";
import Icon from "../icon";
import { getBorderStyle } from "./helpers";
import { TextInputContainer } from "./styles";
import { TextInputProps } from "./typings";

const SHOW_PASSWORD_ENABLED = {
  enabled: true,
  icon: "eye-slash",
};

const SHOW_PASSWORD_DISABLED = {
  enabled: false,
  icon: "eye",
};

const TextInput: FC<TextInputProps> = ({
  value,
  isSecureText,
  marginBottom = "none",
  i18nLabel,
  i18nPlaceholder,
  i18nErrorMessage,
  rightIconColor = "color-basic-600",
  showAlert = false,
  onBlur,
  labelTextAlign = "left",
  onFocus,
  inputStyle,
  variant = "body_md.regular",
  labelVariant = "h4.semiBold",
  errorVariant = "body_xs.regular",
  inputContainerStyle,
  labelStyle,
  backgroundColor = "color-transparent-100",
  borderWidth = 1,
  borderRadius = 12,
  paddingHorizontal = 12,
  paddingVertical = 4,
  borderVariant = "whole",
  rightIcon,
  ...props
}) => {
  const theme = useTheme();
  const [borderColor, setBorderColor] = useState(
    theme.colors["color-basic-300"] as string,
  );

  const [isShowPassword, setIsShowPassword] = useState(SHOW_PASSWORD_DISABLED);
  const toggleShowPassword = () => {
    setIsShowPassword(
      isShowPassword.enabled ? SHOW_PASSWORD_DISABLED : SHOW_PASSWORD_ENABLED,
    );
  };
  const isPassword = isSecureText && !isShowPassword.enabled;

  // Get typography styles
  const inputTypography = getTypographyStyle(variant);
  const labelTypography = getTypographyStyle(labelVariant);
  const errorTypography = getTypographyStyle(errorVariant);

  const errorBorderColor = theme.colors["color-danger-200"] as string;
  const focusBorderColor = theme.colors["color-primary-500"] as string;
  const defaultBorderColor = theme.colors["color-primary-200"] as string;

  const label = i18nLabel && t(i18nLabel);
  const placeholder = i18nPlaceholder && t(i18nPlaceholder);
  const errorMessage = i18nErrorMessage && t(i18nErrorMessage);

  useEffect(() => {
    if (i18nErrorMessage) {
      setBorderColor(errorBorderColor);
      return;
    }

    if (!i18nErrorMessage) {
      setBorderColor(defaultBorderColor);
    }
  }, [i18nErrorMessage, errorBorderColor, defaultBorderColor]);

  const handleBlur = (e: BlurEvent) => {
    setBorderColor(i18nErrorMessage ? errorBorderColor : defaultBorderColor);
    onBlur && onBlur?.(e);
  };

  const handleFocus = (e: FocusEvent) => {
    setBorderColor(focusBorderColor);
    onFocus && onFocus?.(e);
  };

  return (
    <TextInputContainer marginBottom={marginBottom}>
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={theme.colors["color-basic-600"] as ColorValue}
        label={label}
        labelStyle={[
          {
            ...labelTypography,
            paddingLeft: 0,
            marginBottom: 8,
            color: theme.colors["color-basic-1100"] as ColorValue,
            textAlign: labelTextAlign,
          },
          labelStyle,
        ]}
        inputContainerStyle={[
          {
            ...getBorderStyle(borderVariant, borderWidth),
            borderColor: borderColor as ColorValue,
            borderRadius,
            paddingHorizontal,
            paddingVertical,
            backgroundColor: theme.colors[backgroundColor] as ColorValue,
          },
          inputContainerStyle,
        ]}
        containerStyle={{
          margin: 0,
          padding: 0,
          paddingHorizontal: 0,
        }}
        inputStyle={[
          {
            ...inputTypography,
            color: theme.colors["text-input-color"] as ColorValue,
            padding: 0,
            paddingHorizontal: 0,
            minHeight: 36,
          },
          inputStyle,
        ]}
        secureTextEntry={isPassword}
        value={value}
        errorMessage={errorMessage}
        errorStyle={{
          ...errorTypography,
          color: theme.colors["color-danger-200"] as ColorValue,
          marginTop: 4,
          marginHorizontal: 0,
        }}
        rightIcon={
          isSecureText ? (
            <Icon
              name={isShowPassword.icon}
              onPress={toggleShowPassword}
              color={rightIconColor}
            />
          ) : showAlert && !!errorMessage ? (
            <Icon
              name="warning-triangle"
              type="svg"
              color="color-danger-500"
              width={20}
              height={20}
            />
          ) : (
            rightIcon
          )
        }
        {...props}
      />
    </TextInputContainer>
  );
};

export default TextInput;
