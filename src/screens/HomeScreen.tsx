import { StyleSheet, Animated, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showTabBar, hideTabBar } from "../reducers/actions";
import { fetchTeamLogos } from "../services/nhlAPI";
import { setTeamLogos } from "../reducers/actions";
import TeamLogo from "../components/TeamLogo";

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
  const scrollViewRef = useRef(null);
  const [lastY, setLastY] = useState(0);
  const teamLogos = useSelector((state: State) => state.teamLogos.logos);
  const logoArrays = splitArrayIntoChunks(teamLogos, 4);
  const animatedLastY = new Animated.Value(lastY);

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

  const handleScroll = (event: any) => {
    // Extract the values you need from the event immediately
    const currentY = event.nativeEvent.contentOffset?.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const maxY = contentHeight - scrollViewHeight;

    // Show the tab bar always on the top and bottom or if there is bounce effect.
    if (currentY <= 0 || currentY >= maxY) {
      dispatch(showTabBar());
    } else {
      if (currentY - lastY > 0) {
        dispatch(hideTabBar());
      } else {
        dispatch(showTabBar());
      }
    }
    setLastY(currentY);
  };

  const animatedOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedLastY } } }],
    {
      useNativeDriver: true,
      listener: handleScroll,
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
      ref={scrollViewRef}
      onScroll={animatedOnScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {logoArrays.map((logoArray, index) => renderLogosRow(logoArray, index))}
    </Animated.ScrollView>
  );
};

export default HomeScreen;
