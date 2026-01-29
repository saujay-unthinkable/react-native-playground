import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Link href="/screen3" style={styles.link}>
        <Text>Go to Screen 3</Text>
      </Link>
      <Link href="/screen4" style={styles.link}>
        <Text>Go to Screen 4</Text>
      </Link>
      {/* <EditScreenInfo path="app/(tabs)/profile.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  link: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});
