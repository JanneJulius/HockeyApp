import { StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStandings } from "../services/nhlAPI";
import { setStandings } from "../reducers/actions";
import Text from "../components/Text";
import StandingTable from "../components/StandingTable";
import { useTabBarVisibility } from "../hooks/useTabBarVisibility";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 50,
    paddingBottom: 140,
  },
  titleContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  centering: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const StandingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const standings = useSelector((state) => state.standings.standings);
  const { handleScroll } = useTabBarVisibility();

  useEffect(() => {
    // Define an async function inside the effect
    const loadStandings = async () => {
      try {
        const standings = await fetchStandings();
        dispatch(setStandings(standings));
      } catch (error) {
        console.error("Failed to fetch team standings:", error);
      }
    };
    // Call the async function
    loadStandings();
  }, []);

  if (
    !standings.atlantic ||
    !standings.metropolitan ||
    !standings.central ||
    !standings.pacific
  ) {
    return (
      <View style={styles.centering}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleContainer}>
        <Text fontSize="heading" fontWeight="bold" shadow={true}>
          Standings
        </Text>
      </View>

      <Text fontSize="subheading" fontWeight="bold" style={{ marginLeft: 10 }}>
        Atlantic
      </Text>

      <StandingTable
        teams={standings.atlantic.teams}
        sort={standings.atlantic.sort}
        division={"atlantic"}
      />
      <Text fontSize="subheading" fontWeight="bold" style={{ marginLeft: 10 }}>
        Metropolitan
      </Text>

      <StandingTable
        teams={standings.metropolitan.teams}
        sort={standings.metropolitan.sort}
        division={"metropolitan"}
      />

      <Text fontSize="subheading" fontWeight="bold" style={{ marginLeft: 10 }}>
        Central
      </Text>
      <StandingTable
        teams={standings.central.teams}
        sort={standings.central.sort}
        division={"central"}
      />

      <Text fontSize="subheading" fontWeight="bold" style={{ marginLeft: 10 }}>
        Pacific
      </Text>
      <StandingTable
        teams={standings.pacific.teams}
        sort={standings.pacific.sort}
        division={"pacific"}
      />
    </ScrollView>
  );
};

export default StandingScreen;
