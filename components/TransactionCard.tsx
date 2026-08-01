import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";

import { Transaction } from "../lib/storage";

type Props = {
  transaction: Transaction;
};
const transactionIcons = {
  Food: "restaurant-outline",
  Transport: "bus-outline",
  Bills: "receipt-outline",
  Fun: "film-outline",
  Housing: "home-outline",
  Health: "heart-outline",
  Income: "briefcase-outline",
  Other: "ellipsis-horizontal-outline",
} as const;
export default function TransactionCard({ transaction }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTypeIconContainer}>
        {/*airplane is just for test*/}
        <Ionicons
          name={transactionIcons[transaction.type]}
          size={20}
          color={theme.colors.colorTextMuted}
        />
      </View>
      <View style={styles.innerCard}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitleText}>{transaction.note}</Text>
        </View>
        <View style={styles.cardAmountContainer}>
          <Text
            style={[
              styles.cardAmountText,
              transaction.amount < 0
                ? styles.cardAmountNegative
                : styles.cardAmountPositive,
            ]}
          >
            {transaction.amount < 0 ? "-" : "+"}$
            {Math.abs(transaction.amount).toFixed(2)}
          </Text>
        </View>
        <View style={styles.cardTypeDateContainer}>
          <View style={styles.cardTypeDateIdvContainer}>
            <Text style={styles.cardTypeDateText}>{transaction.type}</Text>
          </View>
          <View style={styles.cardTypeDateIdvContainer}>
            <Text style={styles.cardTypeDateText}>·</Text>
          </View>
          <View style={styles.cardTypeDateIdvContainer}>
            <Text style={styles.cardTypeDateText}>{transaction.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.editCancelContainer}>
        <Ionicons
          name="pencil-outline"
          size={20}
          color={theme.colors.colorTextMuted}
        />
      </View>
      <View style={styles.editCancelContainer}>
        <Ionicons
          name="close-outline"
          size={20}
          color={theme.colors.colorTextMuted}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    height: 100,
  },
  cardTypeIconContainer: {
    backgroundColor: theme.colors.colorBg,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginTop: 15,
  },
  innerCard: {
    flexDirection: "column",
    flex: 1,
  },
  editCancelContainer: {
    borderWidth: 0.5,
    borderColor: theme.colors.colorTextMuted,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginVertical: 20,
  },
  cardTitleContainer: {
    alignItems: "flex-start",
  },
  cardTitleText: {
    fontWeight: "500",
    color: "#000000",
    fontSize: 16,
  },
  cardAmountContainer: {
    alignItems: "flex-end",
  },
  cardAmountText: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardAmountNegative: {
    color: theme.colors.colorExpense,
  },
  cardAmountPositive: {
    color: theme.colors.colorSuccess,
  },
  cardTypeDateContainer: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
  },
  cardTypeDateIdvContainer: {
    alignItems: "flex-start",
    marginHorizontal: 3,
  },
  cardTypeDateText: {
    color: theme.colors.colorTextMuted,
  },
});
