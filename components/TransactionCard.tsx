import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Transaction } from "../lib/storage";
import { transactionIcons } from "../lib/transactionIcons";
import { theme } from "../styles/theme";

type Props = {
  transaction: Transaction;
  onDelete: (id: string) => void;
};

export default function TransactionCard({ transaction, onDelete }: Props) {
  const icon =
    transactionIcons.find((category) => category.name === transaction.type)
      ?.icon ?? "➕";

  return (
    <View style={styles.card}>
      <View style={styles.cardTypeIconContainer}>
        <Text style={styles.categoryIconText}>{icon}</Text>
      </View>

      <View style={styles.innerCard}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitleText}>
            {transaction.note || "No note"}
          </Text>
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

      <Pressable
        style={styles.editCancelContainer}
        onPress={() => onDelete(transaction.id)}
      >
        <Ionicons
          name="close-outline"
          size={20}
          color={theme.colors.colorTextMuted}
        />
      </Pressable>
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

  categoryIconText: {
    fontSize: 24,
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
    paddingVertical: 3,
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
