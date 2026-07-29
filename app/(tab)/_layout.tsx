import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Header from "../../components/Header";
import { theme } from "../../styles/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        header: () => (
          <Header
            headerInfo={{
              title:
                {
                  "dashboard/index": "Dashboard",
                  "transactions/index": "Transactions",
                  "account/index": "Account",
                  "profile/index": "Profile",
                }[route.name] ?? "Page",

              subtitle:
                {
                  "dashboard/index": "OVERVIEW",
                  "transactions/index": "MANAGE",
                  "account/index": "MANAGE",
                  "profile/index": "PROFILE",
                }[route.name] ?? "PAGE",
              //intials to KD for testing
              initials: "KD",
            }}
          />
        ),
        tabBarActiveTintColor: theme.colors.colorText,
        tabBarInactiveTintColor: theme.colors.colorTextMuted,
        tabBarStyle: {
          height: "10%",
          paddingTop: 15,
          paddingLeft: 10,
          paddingRight: 10,
        },
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "cash" : "cash-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "aperture" : "aperture-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
