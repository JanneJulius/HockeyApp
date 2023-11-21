import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showTabBar, hideTabBar } from "../reducers/actions";
import { fetchPlayerSpotlight } from "../services/nhlAPI";
import { setPlayerSpotlight } from "../reducers/actions";
import TeamLogo from "../components/TeamLogo";

const styles = StyleSheet.create({
  a: {
    backgroundColor: "white",
  },

  searchInput: {
    height: 40, // Specify the height of the input
    margin: 12,
    marginTop: 70, // Add some margin around the input
    borderWidth: 1, // Set the border width
    padding: 10, // Add some padding inside the input
    borderRadius: 20, // Optional: if you want rounded corners
    borderColor: "#ddd", // Specify the border color
    backgroundColor: "white", // Set the background color of the input
    fontSize: 16, // Set the font size
  },
  playerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
  },
  name: {
    paddingTop: 10,
    fontSize: 30,
  },
  bottomContainer: {
    display: "flex",
    borderWidth: 2,
    borderColor: "black",
    margin: 0,
  },
  logoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const PlayerScreen = () => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const [lastY, setLastY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const playerSpotlight = useSelector((state) => state.playerSpotlight);

  useEffect(() => {
    // Define an async function inside the effect
    const loadPlayerSpotlight = async () => {
      try {
        // Await the fetchPlayerSpotlight function and dispatch the result
        const players = await fetchPlayerSpotlight();
        //console.log(players);
        dispatch(setPlayerSpotlight(players));
      } catch (error) {
        console.error("Failed to fetch player spotlight:", error);
      }
    };
    // Call the async function
    loadPlayerSpotlight();
  }, []);

  const handleScroll = (event) => {
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

  //    contentContainerStyle

  return (
    <>
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search for a player"
        clearButtonMode="while-editing" // iOS only - shows a clear button in the input field
      />
      <Animated.ScrollView
        contentContainerStyle={styles.a}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {playerSpotlight.players &&
          playerSpotlight.players.map((player) => (
            <View key={player.playerId} style={styles.playerContainer}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: player.headshot,
                }}
              />
              <View style={styles.bottomContainer}>
                <Text style={styles.name}>{player.name.default}</Text>
                <View style={styles.logoRow}>
                  <TeamLogo url={player.teamLogo} size={50} />
                  <Text style={styles.name}>#{player.sweaterNumber}</Text>
                  <Text style={styles.name}>{player.position}</Text>
                </View>
              </View>
            </View>
          ))}
      </Animated.ScrollView>
    </>
  );
};

export default PlayerScreen;
