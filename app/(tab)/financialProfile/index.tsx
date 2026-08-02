import FinancialHealth from "@/components/FinancialHealth";
import { theme } from "@/styles/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import GoalCard from "../../../components/GoalCard";

const FinancialProfile = () => {
  return (
    <View style={styles.contentContainer}>
      <FinancialHealth />
      <GoalCard></GoalCard>
    </View>
  );
};

export default FinancialProfile;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.colorBg,
  },
});
