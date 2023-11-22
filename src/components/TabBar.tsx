import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import React, { useRef, useState } from "react";
import TabBarComponent from "./TabBarComponent";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import theme from "../theme";

const ICON_SIZE = 42;

const screenWidth = Dimensions.get("window").width;
const tabBarWidth = screenWidth - 40;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: theme.colors.barColor,
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    bottom: 40,
    left: 20,
    right: 20,
    height: 70,
    flex: 1,
    borderRadius: 15,
    shadowColor: theme.colors.shadowColor,
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },

  iconStyle: {
    position: "absolute",
    top: -ICON_SIZE / 2 - 7,
    left: (tabBarWidth - ICON_SIZE) / 2,
    width: ICON_SIZE,
    height: ICON_SIZE,
    zIndex: 2,
  },
});

const TabBar = ({ state, navigation, descriptors }: BottomTabBarProps) => {
  const isVisible = useSelector((state) => state.tabBar.isVisible);

  const tabBarVisibilityStyle = {
    display: isVisible ? "flex" : "none",
  };

  return (
    <View style={[styles.tabBarStyle, tabBarVisibilityStyle]}>
      <Image
        source={require("../../images/05_NHL_Shield.svg.png")}
        style={styles.iconStyle}
      />
      <TabBarComponent
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </View>
  );
};

export default TabBar;
