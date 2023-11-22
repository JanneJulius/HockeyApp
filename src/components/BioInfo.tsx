import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  bioContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    padding: 25,
  },
  bioText: {
    textAlign: "justify", // Justifies the text to align both left and right sides
    lineHeight: 20, // Adjust line height for better readability if necessary
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
