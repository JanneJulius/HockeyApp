import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  statContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },

  statRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 400,
  },

  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
  statSeparator: {
    height: "70%",
    width: 1,
    backgroundColor: theme.colors.borderColor,
    marginHorizontal: 8,
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
            {periodData?.gamesPlayed ?? 0}
          </Text>
        </View>
        <View style={styles.statSeparator} />

        <View style={styles.statBox}>
          <Text fontSize="body">G</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData?.goals ?? 0}
          </Text>
        </View>
        <View style={styles.statSeparator} />

        <View style={styles.statBox}>
          <Text fontSize="body">A</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData?.assists ?? 0}
          </Text>
        </View>
        <View style={styles.statSeparator} />

        <View style={styles.statBox}>
          <Text fontSize="body">P</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData?.points ?? 0}
          </Text>
        </View>
        <View style={styles.statSeparator} />

        <View style={styles.statBox}>
          <Text fontSize="body">+/-</Text>
          <Text fontSize="body" fontWeight="bold">
            {periodData?.plusMinus ?? 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatInfo;
