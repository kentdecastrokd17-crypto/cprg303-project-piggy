import { theme } from "@/styles/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalCard = () => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleText}>Goals</Text>
        <Pressable>
          <Text style={styles.addGoalText}>Add goal</Text>
        </Pressable>
      </View>
      <View style={styles.goalsContainer}>
        <View style={styles.idvGoalContainer}>
          <View style={styles.idvGoalHeaderContainer}>
            <Text>Dining Out</Text>
            <Text> $140/$200</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoalCard;

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 25,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 7,
  },
  headerTitleText: {
    color: theme.colors.colorPrimary,
    fontSize: 18,
    fontWeight: "500",
  },
  addGoalButton: {},
  addGoalText: {
    fontSize: 18,
    fontWeight: "500",
    color: theme.colors.colorAccentDark,
  },
  goalsContainer: {
    backgroundColor: theme.colors.colorSurface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.colorTextMuted,
    flexDirection: "column",
  },
  idvGoalContainer: {
    flexDirection: "column",
  },
  idvGoalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
