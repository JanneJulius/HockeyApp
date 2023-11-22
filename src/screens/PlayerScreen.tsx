import {
  StyleSheet,
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
import { State } from "../types/types";
import theme from "../theme";

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    margin: 12,
    marginTop: 70,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.backgroundPrimary,
    fontSize: 16,
  },
  playerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headShotContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.colors.backgroundPrimary,
    shadowColor: theme.colors.shadowColor,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 10,
  },
  headShot: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
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
  const playerSpotlight = useSelector((state: State) => state.playerSpotlight);

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

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search for a player"
        clearButtonMode="while-editing"
      />
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {playerSpotlight.players &&
          playerSpotlight.players.map((player) => (
            <View key={player.playerId} style={styles.playerContainer}>
              <View style={styles.headShotContainer}>
                <Image
                  style={styles.headShot}
                  source={{
                    uri: player.headshot,
                  }}
                />
              </View>
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
    </View>
  );
};

export default PlayerScreen;
