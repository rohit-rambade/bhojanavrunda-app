// app/(detail)/group/[groupId].tsx
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function GroupDetail() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Group: {groupId}</Text>
      <Text>This screen is outside tabs → TabBar hidden.</Text>
    </View>
  );
}
