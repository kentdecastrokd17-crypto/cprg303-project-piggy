import { theme } from "@/styles/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalCard = () => {
  const width = "75%";
  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleText}>Goals</Text>
        <Pressable>
          <Text style={styles.addGoalText}>Add goal</Text>
        </Pressable>
      </View>
      <View style={styles.goalsContainer}>
        <Pressable style={styles.idvGoalContainer}>
          <View style={styles.idvGoalHeaderContainer}>
            <Text style={styles.idvGoalTitleText}>Dining Out</Text>
            <Text style={styles.idvGoalProgressText}> $140 / $200</Text>
          </View>
          <View style={styles.idvGoalBar}>
            <View style={[styles.idvGoalBarFilled, { width: width }]}></View>
          </View>
        </Pressable>
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
    borderRadius: 20,
    marginTop: 10,
    paddingVertical: 10,
  },
  idvGoalContainer: {
    flexDirection: "column",
  },
  idvGoalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  idvGoalTitleText: {
    color: theme.colors.colorText,
    fontWeight: "500",
    fontSize: 16,
    alignSelf: "center",
  },
  idvGoalProgressText: {
    color: theme.colors.colorTextMuted,
    alignSelf: "center",
  },
  idvGoalBar: {
    width: "90%",
    backgroundColor: theme.colors.colorBg,
    height: 10,
    borderRadius: 20,
    alignSelf: "center",

    marginTop: 10,
  },
  idvGoalBarFilled: {
    backgroundColor: theme.colors.colorPrimary,
    flex: 1,
    borderRadius: 20,
  },
});
