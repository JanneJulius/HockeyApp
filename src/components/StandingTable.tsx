import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import Text from "./Text";
import theme from "../theme";
import TeamLogo from "./TeamLogo";
import { useSort } from "../hooks/useSort";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderColor: theme.colors.borderColor,
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
  row: {
    backgroundColor: theme.colors.borderColor,
  },
  cell: {
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  imageCellContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

const StandingTable = ({ teams, sort, division }) => {
  const { sortAndDispatch } = useSort(division);

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.rank}
            onPress={() => sortAndDispatch("rank")}
          >
            <Text fontSize="body" fontWeight="bold">
              Rank
            </Text>
          </DataTable.Title>
          <DataTable.Title
            style={styles.cell}
            sortDirection={sort.name}
            onPress={() => sortAndDispatch("name")}
          >
            <Text fontSize="body" fontWeight="bold">
              Team
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.GP}
            onPress={() => sortAndDispatch("GP")}
          >
            <Text fontSize="body" fontWeight="bold">
              GP
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.W}
            onPress={() => sortAndDispatch("W")}
          >
            <Text fontSize="body" fontWeight="bold">
              W
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.L}
            onPress={() => sortAndDispatch("L")}
          >
            <Text fontSize="body" fontWeight="bold">
              L
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.OTL}
            onPress={() => sortAndDispatch("OTL")}
          >
            <Text fontSize="body" fontWeight="bold">
              OT
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.P}
            onPress={() => sortAndDispatch("P")}
          >
            <Text fontSize="body" fontWeight="bold">
              PTS
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.GF}
            onPress={() => sortAndDispatch("GF")}
          >
            <Text fontSize="body" fontWeight="bold">
              GF
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.GA}
            onPress={() => sortAndDispatch("GA")}
          >
            <Text fontSize="body" fontWeight="bold">
              GA
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={styles.cell}
            sortDirection={sort.DIFF}
            onPress={() => sortAndDispatch("DIFF")}
          >
            <Text fontSize="body" fontWeight="bold">
              DIFF
            </Text>
          </DataTable.Title>
        </DataTable.Header>

        {teams.map((team, idx) => (
          <DataTable.Row
            key={team.name}
            style={idx % 2 === 0 ? null : styles.row}
          >
            <DataTable.Cell numeric style={styles.cell}>
              {team.rank}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <View style={styles.imageCellContainer}>
                <TeamLogo url={team.logo} size={30} />
                <Text fontSize="body">{team.name}</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.cell}>
              {team.GP}
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.cell}>
              {team.W}
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.cell}>
              {team.L}
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.cell}>
              {team.OTL}
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.cell}>
              {team.P}
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.cell}>
              {team.GF}
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.cell}>
              {team.GA}
            </DataTable.Cell>
            <DataTable.Cell numeric style={styles.cell}>
              {team.DIFF}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default StandingTable;
