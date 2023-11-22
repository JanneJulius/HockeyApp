import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import React, { useRef, useState } from "react";
import TabBarComponent from "./TabBarComponent";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import theme from "../theme";
import { State } from "../types/types";
import Text from "./Text";

const styles = StyleSheet.create({
  otherInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
  },

  otherInfoRow: {
    display: "flex",
    flexDirection: "row",
  },
});

const heightInFeet = (height: number) => {
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return `${feet}'${inches}"`;
};

const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const PlayerInfo = ({ detailObject }) => {
  return (
    <View style={styles.otherInfoContainer}>
      <View style={styles.otherInfoRow}>
        <Text fontSize="body" fontWeight="bold">
          Height:{" "}
        </Text>
        <Text fontSize="body">{heightInFeet(detailObject.heightInInches)}</Text>
      </View>
      <View style={styles.otherInfoRow}>
        <Text fontSize="body" fontWeight="bold">
          Weight:{" "}
        </Text>
        <Text fontSize="body">{detailObject.weightInPounds} lb</Text>
      </View>
      <View style={styles.otherInfoRow}>
        <Text fontSize="body" fontWeight="bold">
          Born:{" "}
        </Text>
        <Text fontSize="body">{detailObject.birthDate}</Text>
      </View>
      <View style={styles.otherInfoRow}>
        <Text fontSize="body" fontWeight="bold">
          Birthplace:{" "}
        </Text>
        <Text fontSize="body">
          {detailObject.birthCity?.default}
          {", "}
          {detailObject.birthStateProvince?.default}
          {", "}
          {detailObject.birthCountry}
        </Text>
      </View>

      <View style={styles.otherInfoRow}>
        <Text fontSize="body" fontWeight="bold">
          Shoots:{" "}
        </Text>
        <Text fontSize="body">{detailObject.shootsCatches}</Text>
      </View>

      <View style={styles.otherInfoRow}>
        <Text fontSize="body" fontWeight="bold">
          Draft:{" "}
        </Text>
        <Text fontSize="body">
          {detailObject.draftDetails.year}
          {", "}
          {detailObject.draftDetails.teamAbbrev}
          {", "}
          {getOrdinal(detailObject.draftDetails.round)}
          {" round, "}
          {getOrdinal(detailObject.draftDetails.pickInRound)}
          {" pick"}
        </Text>
      </View>
    </View>
  );
};

export default PlayerInfo;
