import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showTabBar, hideTabBar } from "../reducers/actions";
import { fetchPlayerSpotlight, searchPlayers } from "../services/nhlAPI";
import { setPlayerSpotlight } from "../reducers/actions";
import TeamLogo from "../components/TeamLogo";
import { State, Player } from "../types/types";
import theme from "../theme";
import Text from "../components/Text";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const styles = StyleSheet.create({
  searchInput: {
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
  logoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 180,
  },
});

const PlayersScreen: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const [lastY, setLastY] = useState(0);
  const playerSpotlight = useSelector((state: State) => state.playerSpotlight);
  const [playerList, setPlayerList] = useState(null);
  const [loading, setLoading] = useState(false);

  const goToPlayer = (playerId: string) => {
    setPlayerList(null);
    navigation.navigate("PlayerScreen", { playerId: playerId });
  };

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

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 3) {
      setPlayerList(null);
      return;
    }
    setLoading(true);
    const response = await searchPlayers(q);
    //const items = await response.json();
    const suggestions = response
      .filter((item) => item.name.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.playerId,
        title: item.name,
      }));
    setPlayerList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setPlayerList(null);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened) => {}, []);

  return (
    <View>
      <AutocompleteDropdown
        containerStyle={styles.searchInput}
        clearOnFocus={true}
        closeOnBlur={true}
        debounce={300}
        loading={loading}
        onChangeText={getSuggestions}
        dataSet={playerList}
        onOpenSuggestionsList={onOpenSuggestionsList}
        onClear={onClearPress}
        onSelectItem={(item) => {
          item && goToPlayer(item.id);
        }}
      />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 270 }}
      >
        {playerSpotlight.players &&
          playerSpotlight.players.map((player: Player) => (
            <TouchableOpacity
              key={player.playerId}
              onPress={() => goToPlayer(player.playerId)}
            >
              <View key={player.playerId} style={styles.playerContainer}>
                <View style={styles.headShotContainer}>
                  <Image
                    style={styles.headShot}
                    source={{
                      uri: player.headshot,
                    }}
                  />
                </View>

                <Text fontSize="heading" fontWeight="bold" shadow={true}>
                  {player.name.default}
                </Text>

                <View style={styles.logoRow}>
                  <TeamLogo url={player.teamLogo} size={50} />
                  <Text fontSize="heading" fontWeight="bold" shadow={true}>
                    #{player.sweaterNumber}
                  </Text>
                  <Text fontSize="heading" fontWeight="bold" shadow={true}>
                    {player.position === "L" || player.position === "R"
                      ? `${player.position}W`
                      : player.position}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default PlayersScreen;
