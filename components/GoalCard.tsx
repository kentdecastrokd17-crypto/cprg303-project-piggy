import { theme } from "@/styles/theme";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Goal, getGoals } from "../lib/storage";

type GoalCardProps = {
  goalType: string;
};

const GoalCard = ({ goalType }: GoalCardProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  useFocusEffect(
    useCallback(() => {
      const loadGoals = async () => {
        try {
          const storedGoals = await getGoals();

          setGoals(storedGoals);
        } catch (error) {
          console.error("Failed to load transactions:", error);
        }
      };

      loadGoals();
    }, []),
  );
  //filtering the list of transactions so selected month is considered
  const filteredGoals = goals.filter((goal) => goal.goalType === goalType);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleText}>
          {goalType.charAt(0).toUpperCase() + goalType.slice(1)}
        </Text>
        <Pressable onPress={() => router.push(`/financialProfile/${goalType}`)}>
          <Text style={styles.addGoalText}>Add goal</Text>
        </Pressable>
      </View>
      <View style={styles.goalsContainer}>
        {filteredGoals.map((goal) => (
          <Pressable
            key={goal.id}
            style={styles.idvGoalContainer}
            onPress={() => router.push(`/financialProfile/${goal.id}`)}
          >
            <View style={styles.idvGoalHeaderContainer}>
              <Text style={styles.idvGoalTitleText}>{goal.title}</Text>

              <Text style={styles.idvGoalProgressText}>
                ${goal.progressAmount} / ${goal.goalAmount}
              </Text>
            </View>

            <View style={styles.idvGoalBar}>
              <View
                style={[
                  styles.idvGoalBarFilled,
                  {
                    width: `${(goal.progressAmount / goal.goalAmount) * 100}%`,
                  },
                ]}
              />
            </View>
          </Pressable>
        ))}
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
