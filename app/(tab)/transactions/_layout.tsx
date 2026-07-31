import { Stack } from "expo-router";
import { theme } from "../../../styles/theme";

export default function TransactionsLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.colorBg },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="Transaction Details"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
