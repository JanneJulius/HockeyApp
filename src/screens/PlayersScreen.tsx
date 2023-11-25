import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerSpotlight } from "../services/nhlAPI";
import { setPlayerSpotlight } from "../reducers/actions";
import TeamLogo from "../components/TeamLogo";
import { State, Player } from "../types/types";
import theme from "../theme";
import Text from "../components/Text";
import { SearchDropdown } from "../components/SearchDrodown";
import { useTabBarVisibility } from "../hooks/useTabBarVisibility";

const styles = StyleSheet.create({
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
  const playerSpotlight = useSelector((state: State) => state.playerSpotlight);
  const { handleScroll } = useTabBarVisibility();

  const goToPlayer = (playerId: string) => {
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

  return (
    <View>
      <SearchDropdown goToPlayer={goToPlayer} />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={100}
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
