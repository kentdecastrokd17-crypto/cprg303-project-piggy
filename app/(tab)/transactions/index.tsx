import { FlatList } from "react-native";
import TransactionCard from "../../../components/TransactionCard";

//for testing
const TRANSACTIONS = [
  { title: "Co-op Groceries", type: "Food", date: "Today", amount: -46.8 },
  { title: "Paycheque", type: "Income", date: "Yesterday", amount: 980.0 },
  { title: "Transit Pass", type: "Transport", date: "Jul 21", amount: -112 },
];

const index = () => {
  return (
    <>
      <FlatList
        data={TRANSACTIONS}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
      />
    </>
  );
};

export default index;
