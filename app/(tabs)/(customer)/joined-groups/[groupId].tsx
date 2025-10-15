import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function GroupDetail() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  return (
    <>
      <Stack.Screen options={{ title: `Group ${groupId}` }} />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Group: {groupId}
        </Text>
        <Text>
          TabBar remains visible because this is inside the 'joined-groups' tab
          stack.
        </Text>
      </View>
    </>
  );
}
