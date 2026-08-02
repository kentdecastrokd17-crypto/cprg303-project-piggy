import FinancialHealth from "@/components/FinancialHealth";
import { theme } from "@/styles/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

const FinancialProfile = () => {
  return (
    <View style={styles.contentContainer}>
      <FinancialHealth />
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
