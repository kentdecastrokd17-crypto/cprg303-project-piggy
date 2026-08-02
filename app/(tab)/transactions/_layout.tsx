import { Stack } from "expo-router";
import { theme } from "../../../styles/theme";

export default function TransactionsLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.colorBg },
        headerStyle: {
          backgroundColor: theme.colors.colorBg,
        },
        headerTintColor: theme.colors.colorText,
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Add or Edit a Transaction",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
