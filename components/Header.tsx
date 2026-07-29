import { StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";

type HeaderInfo = {
  title: string;
  subtitle: string;
  initials: string;
};

type Props = {
  headerInfo: HeaderInfo;
};

export default function Header({ headerInfo }: Props) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitleText}>{headerInfo.title}</Text>
        <Text style={styles.headerSubtitleText}>{headerInfo.subtitle}</Text>
      </View>
      <View style={styles.headerProfileIconContainer}>
        <Text>
          <Text style={styles.headerProfileIconText}>
            {headerInfo.initials}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 20,

    justifyContent: "space-between",
  },
  headerTitleContainer: {
    flexDirection: "column",
  },
  headerTitleText: {
    color: theme.colors.colorTextMuted,
  },
  headerSubtitleText: {
    color: theme.colors.colorPrimary,
    fontSize: 20,
    fontWeight: "500",
  },
  headerProfileIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.colorPrimary,
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  headerProfileIconText: {
    color: "#ffffff",
  },
});
