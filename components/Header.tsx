import { StyleSheet, Text, View } from "react-native";

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
        <Text>{headerInfo.title}</Text>
        <Text>{headerInfo.subtitle}</Text>
      </View>
      <View style={styles.headerProfileIconContainer}>
        <Text>
          <Text>{headerInfo.initials}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
  },
  headerTitleContainer: {
    flexDirection: "column",
  },
  headerProfileIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
