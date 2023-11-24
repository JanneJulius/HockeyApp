import { StyleSheet, View } from "react-native";
import React from "react";
import theme from "../theme";
import Text from "./Text";
import TeamLogo from "./TeamLogo";

const styles = StyleSheet.create({
  basicInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderColor,
  },
  logoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 180,
  },
});

const BasicInfo = ({ detailObject }) => {
  return (
    <View style={styles.basicInfoContainer}>
      <Text fontSize="heading" fontWeight="bold" shadow={true}>
        {detailObject?.firstName?.default} {detailObject?.lastName?.default}
      </Text>
      <View style={styles.logoRow}>
        <TeamLogo url={detailObject?.teamLogo} size={50} />
        <Text fontSize="heading" fontWeight="bold" shadow={true}>
          #{detailObject?.sweaterNumber}
        </Text>
        <Text fontSize="heading" fontWeight="bold" shadow={true}>
          {detailObject?.position === "L" || detailObject?.position === "R"
            ? `${detailObject?.position}W`
            : detailObject?.position}
        </Text>
      </View>
    </View>
  );
};

export default BasicInfo;
