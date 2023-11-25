import { StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamLogos } from "../services/nhlAPI";
import { setTeamLogos } from "../reducers/actions";
import TeamLogo from "../components/TeamLogo";
import { useTabBarVisibility } from "../hooks/useTabBarVisibility";

import { Logo, Index, LogoArray, State } from "../types/types";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  logoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

function splitArrayIntoChunks<T>(array: T[], baseChunkSize: number): T[][] {
  const result: T[][] = [];
  let increment = 0;
  let counter = 0;

  for (let i = 0; i < array.length; ) {
    // Calculate the current chunk size
    let chunkSize = baseChunkSize + increment;
    // Push the current chunk to the result array
    result.push(array.slice(i, i + chunkSize));
    // Move the index by the current chunk size
    i += chunkSize;
    // Increment the counter and check if it should reset and increase increment
    counter++;
    if (counter % 3 === 0) {
      increment++; // After every 3 chunks, increase the baseChunkSize
    }
  }

  return result;
}

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const teamLogos = useSelector((state: State) => state.teamLogos.logos);
  const logoArrays = splitArrayIntoChunks(teamLogos, 4);
  const { handleScroll } = useTabBarVisibility();
  const animatedLastY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define an async function inside the effect
    const loadLogos = async () => {
      try {
        // Await the fetchTeamLogos function and dispatch the result
        const logos = await fetchTeamLogos();
        dispatch(setTeamLogos(logos));
      } catch (error) {
        console.error("Failed to fetch team logos:", error);
      }
    };
    // Call the async function
    loadLogos();
  }, []);

  const animatedOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedLastY } } }],
    {
      useNativeDriver: true,
      listener: (event) => handleScroll(event),
    }
  );

  // This function will render a single row of logos
  const renderLogosRow = (logoArray: LogoArray, index: Index): JSX.Element => {
    let outputRange;
    switch (index % 3) {
      case 0: // Indices 0, 3, 6, ...
        outputRange = -20;
        break;
      case 1: // Indices 1, 4, 7, ...
        outputRange = -30;
        break;
      case 2: // Indices 2, 5, 8, ...
        outputRange = -40;
        break;
      default:
        outputRange = 0; // Default case, which shouldn't actually occur here
    }

    const rowAnimation = animatedLastY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, outputRange],
    });
    return (
      <Animated.View
        key={index}
        style={[styles.logoRow, { transform: [{ translateX: rowAnimation }] }]}
      >
        {logoArray.map((logo: Logo, logoIndex: Index) => (
          <TeamLogo key={logoIndex} url={logo} size={300} />
        ))}
      </Animated.View>
    );
  };

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
      onScroll={animatedOnScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {logoArrays &&
        logoArrays.map((logoArray, index) => renderLogosRow(logoArray, index))}
    </Animated.ScrollView>
  );
};

export default HomeScreen;
