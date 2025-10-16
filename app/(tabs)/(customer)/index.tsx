// DashboardScreen.tsx (or app/(customer)/index.tsx)
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ORANGE = "#E67830";
const BG = "#FFF8F3";
const MUTED = "#7A7A7A";
const CARD = "#FFFFFF";
const BORDER = "#EFEFEF";

type MealType = "FULL" | "ONLY_CHAPATI" | "NO_RICE";
type NeedType = "NEED" | "NOT_NEED";

const vegMenu = [
  {
    id: "v1",
    name: "Paneer Curry",
    price: 120,
    img: "https://picsum.photos/seed/paneer/100",
  },
  {
    id: "v2",
    name: "Dal Tadka",
    price: 100,
    img: "https://picsum.photos/seed/dal/100",
  },
  {
    id: "v3",
    name: "Mix Veg",
    price: 110,
    img: "https://picsum.photos/seed/mixveg/100",
  },
];

const nonVegMenu = [
  {
    id: "n1",
    name: "Egg Curry",
    price: 120,
    img: "https://picsum.photos/seed/egg/100",
  },
  {
    id: "n2",
    name: "Chicken Bhuna",
    price: 160,
    img: "https://picsum.photos/seed/chick/100",
  },
];

export default function DashboardScreen() {
  const [isJoined, setJoined] = useState(true);
  const [tab, setTab] = useState<"VEG" | "NONVEG">("VEG");

  const [need, setNeed] = useState<NeedType>("NEED");
  const [mealType, setMealType] = useState<MealType>("FULL");
  const [extraChapati, setExtraChapati] = useState(false);
  const [bhakri, setBhakri] = useState(false);

  const menuData = useMemo(() => (tab === "VEG" ? vegMenu : nonVegMenu), [tab]);

  const onSave = () => {
    // Hook this to your API/redux mutation
    const payload = {
      need,
      mealType,
      extras: { extraChapati, bhakri },
      forDate: "tomorrow",
    };
    console.log("SAVE PREFERENCE:", payload);
    // show toast/snackbar in your app
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />
      <View style={styles.container}>
        {/* App header */}
        <View style={styles.appBar}>
          {/* Greeting */}
          <View>
            <Text style={styles.hi}>Hi, Rohit</Text>
            <Text style={styles.subtitle}>Your lunch for tomorrow</Text>
          </View>

          {/* <Text style={styles.brand}>BhojanVrunda</Text> */}
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=12" }}
            style={styles.avatar}
          />
        </View>

        {/* Greeting */}
        {/* <Text style={styles.hi}>Hi, Rohit</Text>
        <Text style={styles.subtitle}>Your lunch for tomorrow</Text> */}

        {/* Tomorrow's Menu */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Tomorrow&apos;s Menu</Text>
            <Pressable hitSlop={10}>
              <Text style={styles.link}>All</Text>
            </Pressable>
          </View>

          <View style={styles.segment}>
            <SegmentButton
              active={tab === "VEG"}
              label="Veg"
              onPress={() => setTab("VEG")}
            />
            <SegmentButton
              active={tab === "NONVEG"}
              label="Non-Veg"
              onPress={() => setTab("NONVEG")}
            />
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={menuData}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ gap: 12, paddingTop: 8 }}
            renderItem={({ item }) => (
              <View style={styles.menuCard}>
                <Image source={{ uri: item.img }} style={styles.menuImg} />
                <Text style={styles.menuName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.menuPrice}>₹{item.price}</Text>
              </View>
            )}
          />
        </View>

        {/* Preference */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Preference</Text>

          <Text style={styles.label}>Need Tiffin?</Text>
          <View style={styles.segment}>
            <SegmentButton
              active={need === "NEED"}
              label="Need"
              onPress={() => setNeed("NEED")}
            />
            <SegmentButton
              active={need === "NOT_NEED"}
              label="Not Need"
              onPress={() => setNeed("NOT_NEED")}
            />
          </View>

          <Text style={[styles.label, { marginTop: 12 }]}>Type</Text>
          <View style={styles.segment3}>
            <SegmentButton
              small
              active={mealType === "FULL"}
              label="Full Tiffin"
              onPress={() => setMealType("FULL")}
            />
            <SegmentButton
              small
              active={mealType === "ONLY_CHAPATI"}
              label="Only Chapati"
              onPress={() => setMealType("ONLY_CHAPATI")}
            />
            <SegmentButton
              small
              active={mealType === "NO_RICE"}
              label="No Rice"
              onPress={() => setMealType("NO_RICE")}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Extra Chapati</Text>
            <Switch
              value={extraChapati}
              onValueChange={setExtraChapati}
              thumbColor={extraChapati ? "#fff" : "#fff"}
              trackColor={{ false: "#ddd", true: ORANGE }}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Bhakri</Text>
            <Switch
              value={bhakri}
              onValueChange={setBhakri}
              thumbColor={bhakri ? "#fff" : "#fff"}
              trackColor={{ false: "#ddd", true: ORANGE }}
            />
          </View>

          <Pressable style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>

        {/* Optional bottom padding so the last card isn't under a tab bar */}
        <View style={{ height: 24 }} />
      </View>
    </SafeAreaView>
  );
}

/* ------------------------------ Subcomponents ------------------------------ */

function QuickAction({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={styles.quickItem}
      onPress={onPress}
      android_ripple={{ color: "#f0f0f0", borderless: false }}
    >
      <View style={styles.quickIconWrap}>
        <Ionicons name={icon} size={20} color="#fff" />
      </View>
      <Text style={styles.quickLabel} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

function SegmentButton({
  active,
  label,
  onPress,
  small,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
  small?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.segmentBtn,
        small && { paddingHorizontal: 10, paddingVertical: 8 },
        active ? { backgroundColor: ORANGE } : { backgroundColor: "#F6E4D7" },
      ]}
    >
      <Text
        style={[styles.segmentText, { color: active ? "#fff" : ORANGE }]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/* --------------------------------- Styles --------------------------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },

  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  brand: { fontSize: 20, fontWeight: "800", color: ORANGE, letterSpacing: 0.3 },
  avatar: { width: 34, height: 34, borderRadius: 17 },

  hi: { fontSize: 24, fontWeight: "800", marginTop: 8, color: "#1A1A1A" },
  subtitle: { fontSize: 14, color: MUTED, marginTop: 2 },

  quickGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    flexWrap: "wrap",
  },
  quickItem: {
    flexBasis: "24%",
    alignItems: "center",
    backgroundColor: CARD,
    borderRadius: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: BORDER,
  },
  quickIconWrap: {
    backgroundColor: ORANGE,
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    paddingHorizontal: 6,
  },

  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: BORDER,
  },

  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#1A1A1A" },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: { color: ORANGE, fontWeight: "700" },

  groupName: { color: MUTED, marginTop: 2 },
  pillBtn: {
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: { fontWeight: "800" },

  segment: {
    backgroundColor: "#F6E4D7",
    borderRadius: 12,
    padding: 4,
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  segment3: {
    backgroundColor: "#F6E4D7",
    borderRadius: 12,
    padding: 4,
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  segmentBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  segmentText: { fontWeight: "800", fontSize: 12, letterSpacing: 0.3 },

  menuCard: {
    width: 130,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
  },
  menuImg: { width: "100%", height: 70, borderRadius: 8, marginBottom: 8 },
  menuName: { fontWeight: "700", fontSize: 13, marginBottom: 2 },
  menuPrice: { color: ORANGE, fontWeight: "800" },

  label: { marginTop: 4, color: MUTED, fontWeight: "600" },

  toggleRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  toggleLabel: { fontSize: 14, color: "#202020", fontWeight: "600" },

  saveBtn: {
    backgroundColor: ORANGE,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 12,
  },
  saveText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
