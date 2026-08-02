"use client";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Header from "../../components/Header";
import { theme } from "../../styles/theme";

export default function TabLayout() {
  //retrieve time for hello message
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "GOOD MORNING";
    } else if (hour < 18) {
      return "GOOD AFTERNOON";
    } else {
      return "GOOD EVENING";
    }
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        sceneStyle: {
          backgroundColor: theme.colors.colorBg,
        },
        header: () => (
          <Header
            headerInfo={{
              title:
                {
                  "dashboard/index": getGreeting(),
                  transactions: "ALL ACTIVITY",
                  financialProfile: "YOUR STANDING",
                  "account/index": "MANAGE",
                }[route.name] ?? "Page",

              subtitle:
                {
                  "dashboard/index": "Kent",
                  transactions: "Transactions",
                  financialProfile: "Financial Profile",
                  "account/index": "Account",
                }[route.name] ?? "PAGE",
              //intials to KD for testing
              initials: "KD",
            }}
          />
        ),
        tabBarActiveTintColor: theme.colors.colorText,
        tabBarInactiveTintColor: theme.colors.colorTextMuted,
        tabBarStyle: {
          height: 110,
          paddingTop: 15,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: theme.colors.colorSurface,
          paddingBottom: 50,
        },
      })}
    >
      <Tabs.Screen
        name="dashboard/index"
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
        name="financialProfile"
        options={{
          title: "Financial Profile",
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
        name="account/index"
        options={{
          title: "Account",
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
