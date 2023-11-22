import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import React, { useRef, useState } from "react";
import TabBarComponent from "./TabBarComponent";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import theme from "../theme";
import { State } from "../types/types";
import Text from "./Text";

const styles = StyleSheet.create({
  statContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },

  statRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const StatInfo = ({ period, periodData }) => {
  return (
    <View style={styles.statContainer}>
      <Text fontSize="body" fontWeight="bold">
        {period}
      </Text>
      <View style={styles.statRow}>
        <View style={styles.statBox}>
          <Text fontSize="body">GP</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData.gamesPlayed}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text fontSize="body">G</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData.goals}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text fontSize="body">A</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData.assists}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text fontSize="body">P</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData.points}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text fontSize="body">+/-</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData.plusMinus}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatInfo;
