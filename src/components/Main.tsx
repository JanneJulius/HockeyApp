import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PlayerScreen from "../screens/PlayerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StandingScreen from "../screens/StandingScreen";
import TabBar from "./TabBar";

const BottomTab = createBottomTabNavigator();

const Main = () => {
  const renderTabBar = (props) => <TabBar {...props} />;

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBar={(props) => renderTabBar(props)}
        screenOptions={{
          headerShown: false,
        }}
      >
        <BottomTab.Screen name="Home" component={HomeScreen} />

        <BottomTab.Screen name="Players" component={PlayerScreen} />
        <BottomTab.Screen name="Standings" component={StandingScreen} />
        <BottomTab.Screen name="Settings" component={SettingsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
