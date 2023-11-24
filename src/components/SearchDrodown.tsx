import React, { memo, useCallback, useState, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { searchPlayers } from "../services/nhlAPI";
import theme from "../theme";
import { headShotUrl } from "../services/nhlAPI";
import Text from "./Text";

const styles = StyleSheet.create({
  searchInputContainer: {
    marginTop: 55,
    backgroundColor: "#F2F2F2",
  },
  searchInput: {
    borderRadius: 25,
    backgroundColor: theme.colors.backgroundPrimary,
    marginHorizontal: 20,
    color: theme.colors.textPrimary,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  headShot: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export const SearchDropdown = memo(({ goToPlayer }) => {
  const [playerList, setPlayerList] = useState(null);
  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    if (typeof q !== "string" || q.length < 3) {
      setPlayerList(null);
      return;
    }
    const response = await searchPlayers(q);
    //const items = await response.json();
    const suggestions = response
      .filter((item) => item.name.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.playerId,
        title: item.name,
      }));
    setPlayerList(suggestions);
  }, []);

  const onSelectItem = useCallback((item) => {
    if (item) {
      goToPlayer(item.id);
      setPlayerList(null);
    }
  }, []);

  return (
    <AutocompleteDropdown
      ref={searchRef}
      inputContainerStyle={styles.searchInputContainer}
      showClear={false}
      showChevron={false}
      clearOnFocus={true}
      debounce={400}
      onChangeText={getSuggestions}
      useFilter={false}
      dataSet={playerList}
      onSelectItem={(item) => onSelectItem(item)}
      textInputProps={{
        placeholder: "Search for a player...",
        autoCorrect: false,
        autoCapitalize: "none",
        style: styles.searchInput,
      }}
      renderItem={(item, text) => (
        <View style={styles.itemContainer}>
          <Image
            style={styles.headShot}
            source={{
              uri: headShotUrl(item.id),
            }}
            alt="Player headshot"
          />
          <Text fontSize="body" fontWeight="bold">
            {item.title}
          </Text>
        </View>
      )}
    />
  );
});
