"use client";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { theme } from "../../styles/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.colors.colorBg,
        },
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
      }}
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
