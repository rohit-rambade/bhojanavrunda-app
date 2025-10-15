import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const groups = [
  { id: "g1", name: "Alpha" },
  { id: "g2", name: "Beta" },
];

export default function GroupsList() {
  return (
    <View style={styles.container}>
      {groups.map((g) => (
        <TouchableOpacity
          key={g.id}
          style={styles.card}
          // Because we are already inside the 'joined-groups' tab,
          // we can navigate to the sibling dynamic route:
          onPress={() => router.push(`/joined-groups/${g.id}`)}
        >
          <Text style={styles.title}>{g.name}</Text>
          <Text>→</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  card: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontSize: 16, fontWeight: "600" },
});
