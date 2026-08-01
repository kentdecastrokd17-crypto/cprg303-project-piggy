import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../styles/theme";

const AmountEntry = () => {
  const [amount, setAmount] = useState("0.00");

  //sets functionality for up and down arrows. Converts prev to a number, adds or subtracts one (without dropping below 0) then converts back to string
  const increaseAmount = () => {
    setAmount((prev) => (parseFloat(prev) + 1).toString());
  };
  const decreaseAmount = () => {
    setAmount((prev) => Math.max(0, parseFloat(prev) - 1).toString());
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.dollarSignContainer}>
        <Text style={styles.dollarSignText}>$</Text>
      </View>
      <View style={styles.amountContainer}>
        <TextInput
          style={styles.amountText}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.colors.colorTextMuted}
        />
      </View>
      <View style={styles.arrowContainer}>
        <Pressable onPress={increaseAmount}>
          <Text style={styles.arrowText}>▲</Text>
        </Pressable>
        <Pressable onPress={decreaseAmount}>
          <Text style={styles.arrowText}>▼</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AmountEntry;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.colorBg,
  },
  dollarSignContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dollarSignText: {
    color: theme.colors.colorTextMuted,
    fontSize: 24,
    fontWeight: "500",
  },
  amountContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  amountText: {
    color: theme.colors.colorTextMuted,
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    width: "100%",
    paddingVertical: 0,
  },
  arrowContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  arrowText: {
    color: theme.colors.colorTextMuted,
    fontSize: 20,
  },
});
