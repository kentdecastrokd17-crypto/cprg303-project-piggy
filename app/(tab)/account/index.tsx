"use client";

import Header from "@/components/Header";
import { ProfileFormData, profileSchema } from "@/lib/schema";
import {
  clearAllData,
  DEFAULT_PROFILE,
  getInitials,
  getProfile,
  saveProfile,
} from "@/lib/storage";
import { theme } from "@/styles/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

const Account = () => {
  const [name, setName] = useState(DEFAULT_PROFILE.name);
  const [email, setEmail] = useState(DEFAULT_PROFILE.email);
  const [monthlyBudgetGoal, setMonthlyBudgetGoal] = useState("0.00");
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    DEFAULT_PROFILE.notificationsEnabled,
  );
  const [initials, setInitials] = useState(getInitials(DEFAULT_PROFILE.name));
  const [savedMessage, setSavedMessage] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: DEFAULT_PROFILE.name,
      email: DEFAULT_PROFILE.email,
      monthlyBudgetGoal: DEFAULT_PROFILE.monthlyBudgetGoal,
      notificationsEnabled: DEFAULT_PROFILE.notificationsEnabled,
    },
  });

  // Reload the saved profile every time this tab gains focus, so edits
  // made elsewhere (or a data reset) are always reflected here
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const profile = await getProfile();

          setName(profile.name);
          setEmail(profile.email);
          setMonthlyBudgetGoal(profile.monthlyBudgetGoal.toString());
          setNotificationsEnabled(profile.notificationsEnabled);
          setInitials(getInitials(profile.name));

          setValue("name", profile.name);
          setValue("email", profile.email);
          setValue("monthlyBudgetGoal", profile.monthlyBudgetGoal);
          setValue("notificationsEnabled", profile.notificationsEnabled);
        } catch (error) {
          console.error("Failed to load profile:", error);
        }
      };

      loadProfile();
    }, [setValue]),
  );

  const onSubmit = async (data: ProfileFormData) => {
    await saveProfile({
      name: data.name,
      email: data.email ?? "",
      monthlyBudgetGoal: data.monthlyBudgetGoal,
      notificationsEnabled: data.notificationsEnabled,
    });

    setInitials(getInitials(data.name));
    setSavedMessage("Saved!");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => {
      const next = !prev;
      setValue("notificationsEnabled", next);
      return next;
    });
  };

  const handleReset = () => {
    Alert.alert(
      "Reset all data?",
      "This will permanently delete every transaction, goal, and account detail stored on this device. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await clearAllData();

            setName(DEFAULT_PROFILE.name);
            setEmail(DEFAULT_PROFILE.email);
            setMonthlyBudgetGoal(DEFAULT_PROFILE.monthlyBudgetGoal.toString());
            setNotificationsEnabled(DEFAULT_PROFILE.notificationsEnabled);
            setInitials(getInitials(DEFAULT_PROFILE.name));

            setValue("name", DEFAULT_PROFILE.name);
            setValue("email", DEFAULT_PROFILE.email);
            setValue("monthlyBudgetGoal", DEFAULT_PROFILE.monthlyBudgetGoal);
            setValue(
              "notificationsEnabled",
              DEFAULT_PROFILE.notificationsEnabled,
            );
          },
        },
      ],
    );
  };

  return (
    <>
      <Header
        headerInfo={{
          title: "MANAGER",
          subtitle: "Account",
          initials,
        }}
      />

      <View style={styles.contentContainer}>
        {/* Edit account */}
        <Text style={styles.sectionTitle}>Edit account</Text>
        <View style={styles.card}>
          <Text style={styles.inputLabel}>Full name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setValue("name", text);
            }}
            placeholder="Your name"
            placeholderTextColor={theme.colors.colorTextMuted}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

          <Text style={[styles.inputLabel, styles.inputLabelSpaced]}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setValue("email", text);
            }}
            placeholder="you@example.com"
            placeholderTextColor={theme.colors.colorTextMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Text style={[styles.inputLabel, styles.inputLabelSpaced]}>
            Monthly budget goal
          </Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.dollarSignText}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={monthlyBudgetGoal}
              onChangeText={(text) => {
                setMonthlyBudgetGoal(text);
                setValue("monthlyBudgetGoal", Number(text));
              }}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={theme.colors.colorTextMuted}
            />
          </View>
          {errors.monthlyBudgetGoal && (
            <Text style={styles.errorText}>
              {errors.monthlyBudgetGoal.message}
            </Text>
          )}

          <Pressable
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitText}>
              {savedMessage || "Save changes"}
            </Text>
          </Pressable>
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Text style={styles.settingIconText}>🔔</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Notifications</Text>
              <Text style={styles.settingMeta}>
                Budget alerts &amp; reminders
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{
                false: theme.colors.colorBorder,
                true: theme.colors.colorPrimaryLight,
              }}
              thumbColor={"#ffffff"}
            />
          </View>
        </View>

        {/* Reset data */}
        <Pressable style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset all app data</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: theme.colors.colorBg,
  },

  sectionTitle: {
    color: theme.colors.colorPrimary,
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },

  card: {
    backgroundColor: theme.colors.colorSurface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.colorTextMuted,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },

  inputLabel: {
    color: theme.colors.colorPrimary,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },

  inputLabelSpaced: {
    marginTop: 16,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.colorBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: theme.colors.colorText,
    justifyContent: "center",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },

  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.colorBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  dollarSignText: {
    color: theme.colors.colorTextMuted,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 4,
  },

  amountInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.colorText,
  },

  submitButton: {
    marginTop: 20,
    backgroundColor: theme.colors.colorAccent,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  submitText: {
    color: theme.colors.colorSurface,
    fontWeight: "600",
    fontSize: 16,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.colorBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  settingIconText: {
    fontSize: 20,
  },

  settingInfo: {
    flex: 1,
  },

  settingName: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.colorText,
  },

  settingMeta: {
    fontSize: 13,
    color: theme.colors.colorTextMuted,
    marginTop: 2,
  },

  resetButton: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.colorExpense,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },

  resetButtonText: {
    color: theme.colors.colorExpense,
    fontWeight: "600",
    fontSize: 15,
  },
});
