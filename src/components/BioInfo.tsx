import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "./Text";

const styles = StyleSheet.create({
  bioContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    padding: 25,
  },
  bioText: {
    textAlign: "justify",
    lineHeight: 20,
  },
});

const BioInfo = ({ bio }) => {
  return (
    <View style={styles.bioContainer}>
      <Text fontSize="heading" fontWeight="bold" shadow={true}>
        Bio:
      </Text>
      <Text style={styles.bioText} fontSize="body" fontWeight="bold">
        {bio}
      </Text>
    </View>
  );
};

export default BioInfo;
