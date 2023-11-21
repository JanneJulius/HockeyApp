import React from "react";
import { SvgUri } from "react-native-svg";

const TeamLogo = React.memo(({ url, size }) => {
  const handleImageError = (error) => {
    console.log("Failed to load image:", url, error);
  };
  return (
    <SvgUri uri={url} width={size} height={size} onError={handleImageError} />
  );
});

export default TeamLogo;
