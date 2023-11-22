import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlayersScreen from "./PlayersScreen";
import PlayerScreen from "./PlayerScreen";
const PlayerStack = createStackNavigator();

const PlayerStackScreen: React.FC = () => {
  return (
    <PlayerStack.Navigator screenOptions={{ headerShown: false }}>
      <PlayerStack.Screen name="PlayersScreen" component={PlayersScreen} />
      <PlayerStack.Screen name="PlayerScreen" component={PlayerScreen} />
    </PlayerStack.Navigator>
  );
};

export default PlayerStackScreen;
