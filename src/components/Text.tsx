import React from "react";
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  StyleSheet,
} from "react-native";
import theme from "../theme";
import { FontWeight } from "../types/types";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal as FontWeight,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold as FontWeight,
  },
  textShadow: {
    textShadowColor: theme.colors.shadowColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

// Define the types for your custom props to match the theme structure
type ColorType = keyof typeof theme.colors;
type FontSizeType = keyof typeof theme.fontSizes;
type FontWeightType = keyof typeof theme.fontWeights;

interface TextProps extends NativeTextProps {
  color?: ColorType;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightType;
  shadow?: boolean;
  style?: NativeTextProps["style"];
}

const Text: React.FC<TextProps> = ({
  color,
  fontSize,
  fontWeight,
  shadow,
  style,
  ...props
}) => {
  // Create a function to get color by key
  const getColor = (colorKey: ColorType) => theme.colors[colorKey];

  // Map fontSize and fontWeight to theme values
  const getFontSize = (sizeKey: FontSizeType) => theme.fontSizes[sizeKey];
  const getFontWeight = (weightKey: FontWeightType) =>
    theme.fontWeights[weightKey];

  const textStyle = [
    styles.text,
    color && { color: getColor(color) },
    fontSize && { fontSize: getFontSize(fontSize) },
    fontWeight && { fontWeight: getFontWeight(fontWeight) },
    shadow && styles.textShadow,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
