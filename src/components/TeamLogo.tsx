import React from "react";
import { SvgUri } from "react-native-svg";
import { TeamLogoProps } from "../types/types";

const TeamLogo: React.FC<TeamLogoProps> = React.memo(({ url, size }) => {
  const handleImageError = (error: Error) => {
    console.log("Failed to load image:", url, error);
  };

  return (
    <SvgUri uri={url} width={size} height={size} onError={handleImageError} />
  );
});

export default TeamLogo;
