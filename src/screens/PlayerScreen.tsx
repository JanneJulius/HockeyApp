import React from "react";
import Text from "../components/Text";

const PlayerScreen: React.FC = ({ route, navigation }) => {
  const { playerId } = route.params;

  return <Text>{playerId}</Text>;
};

export default PlayerScreen;
