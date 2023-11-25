import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { fetchPlayerDetails, fetchPlayerBio } from "../services/nhlAPI";
import theme from "../theme";
import { AntDesign } from "@expo/vector-icons";
import PlayerInfo from "../components/PlayerInfo";
import StatInfo from "../components/StatInfo";
import BasicInfo from "../components/BasicInfo";
import BioInfo from "../components/BioInfo";
import { useTabBarVisibility } from "../hooks/useTabBarVisibility";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 270,
    paddingTop: 50,
  },
  imagesContainer: {
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  faceImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    left: "50%",
    marginLeft: -50,
    top: "50%",
    marginTop: 60,
    borderColor: "white",
    borderWidth: 1,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },

  centering: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const PlayerScreen: React.FC = ({ route, navigation }) => {
  const { playerId } = route.params;
  const [detailObject, setDetailObject] = useState(null);
  const [playerBio, setPlayerBio] = useState(null);
  const { handleScroll } = useTabBarVisibility();

  const goToPlayers = () => {
    navigation.navigate("PlayersScreen");
  };

  useEffect(() => {
    // Define an async function inside the effect
    const loadPlayerDetails = async () => {
      try {
        const data = await fetchPlayerDetails(playerId);
        const bio = await fetchPlayerBio(playerId);
        setDetailObject(data);
        setPlayerBio(bio);
      } catch (error) {
        console.error("Failed to fetch player spotlight:", error);
      }
    };
    // Call the async function
    loadPlayerDetails();
  }, []);

  // Still loading, show a spinner
  if (!detailObject || !playerBio) {
    return (
      <View style={styles.centering}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  function formatSeason(season) {
    const seasonStr = season.toString();

    const startYear = seasonStr.substring(0, 4);
    const endYear = seasonStr.substring(6);

    return `${startYear}-${endYear} Season`;
  }

  const lastSubSeasonName = detailObject?.featuredStats?.season
    ? formatSeason(detailObject?.featuredStats?.season)
    : "Not known";

  const subSeasonStats = detailObject?.featuredStats?.regularSeason?.subSeason;
  const careerStats = detailObject?.featuredStats?.regularSeason?.career;
  const bio = playerBio?.items[0]?.fields?.biography;

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imagesContainer}>
        <Image
          source={{ uri: detailObject.heroImage }}
          resizeMode="contain"
          style={styles.backgroundImage}
          alt="background image"
        />
        <TouchableOpacity style={styles.backButton} onPress={goToPlayers}>
          <AntDesign name="back" size={40} color={theme.colors.barColor} />
        </TouchableOpacity>
        <Image
          source={{ uri: detailObject.headshot }}
          style={styles.faceImage}
          alt="face image"
        />
      </View>

      <BasicInfo detailObject={detailObject} />
      <StatInfo period={lastSubSeasonName} periodData={subSeasonStats} />
      <StatInfo period="Career" periodData={careerStats} />
      <PlayerInfo detailObject={detailObject} />
      <BioInfo bio={bio} />
    </ScrollView>
  );
};

export default PlayerScreen;
