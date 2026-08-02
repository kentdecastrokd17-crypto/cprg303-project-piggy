import FinancialHealth from "@/components/FinancialHealth";
import Header from "@/components/Header";
import { theme } from "@/styles/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import GoalCard from "../../../components/GoalCard";

const FinancialProfile = () => {
  return (
    <>
      <Header
        headerInfo={{
          title: "YOUR STANDING",

          subtitle: "Financial Profile",
          //intials to KD for testing
          initials: "KD",
        }}
      />
      <View style={styles.contentContainer}>
        <FinancialHealth />
        <GoalCard goalType="budgeting" />
        <GoalCard goalType="long-term" />
      </View>
    </>
  );
};

export default FinancialProfile;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.colorBg,
  },
});
