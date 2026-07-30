import { StyleSheet, View } from "react-native";
import { theme } from "../../../styles/theme";

const AddTransaction = () => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.expenseIncomeContainer}></View>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.colorBg,
  },
  expenseIncomeContainer: {
    width: "100%",
    backgroundColor: theme.colors.colorBg,
    height: 30,
  },
  expenseIncomeInnerContainer: {},
  expenseSelectedContainer: {},
  incomeSelectedContainer: {},
  expenseIncomeText: {},
  expenseIncomeSelectedText: {
    color: "#ffffff",
  },
});
