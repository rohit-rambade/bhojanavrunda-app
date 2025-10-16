import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ORANGE = "#E67830";
const BG = "#FFF8F3";
const CARD = "#FFFFFF";
const BORDER = "#EFEFEF";
const MUTED = "#777";

type GroupType = "VEG" | "NONVEG";
type Group = {
  id: string;
  name: string;
  members: number;
  type: GroupType;
  isJoined: boolean;
  priceFrom: number;
  nextMenu: string[]; // quick preview for tomorrow
  cover?: string;
};

// mock data
const GROUPS: Group[] = [
  {
    id: "g1",
    name: "BhojanVrunda A",
    members: 18,
    type: "VEG",
    isJoined: true,
    priceFrom: 89,
    nextMenu: ["Paneer", "Dal"],
    cover: "https://picsum.photos/seed/a/400/240",
  },
  {
    id: "g2",
    name: "SpiceHub",
    members: 12,
    type: "NONVEG",
    isJoined: false,
    priceFrom: 109,
    nextMenu: ["Chicken", "Egg Curry"],
    cover: "https://picsum.photos/seed/b/400/240",
  },
  {
    id: "g3",
    name: "Office Tiffin",
    members: 26,
    type: "VEG",
    isJoined: false,
    priceFrom: 79,
    nextMenu: ["Mix Veg", "Dal"],
    cover: "https://picsum.photos/seed/c/400/240",
  },
  {
    id: "g4",
    name: "Homely Meals",
    members: 9,
    type: "NONVEG",
    isJoined: true,
    priceFrom: 129,
    nextMenu: ["Egg Curry", "Rice"],
    cover: "https://picsum.photos/seed/d/400/240",
  },
];

export default function GroupList() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | GroupType>("ALL");
  const [joinedOnly, setJoinedOnly] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(GROUPS);

  const filtered = useMemo(() => {
    return data
      .filter((g) => (filter === "ALL" ? true : g.type === filter))
      .filter((g) => (joinedOnly ? g.isJoined : true))
      .filter((g) => g.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [data, filter, joinedOnly, query]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // TODO: fetch from API
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  const toggleJoin = (id: string) => {
    setData((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isJoined: !g.isJoined } : g))
    );
  };

  const renderItem = ({ item }: { item: Group }) => (
    <GroupCard
      group={item}
      onPress={() => router.push(`/joined-groups/${item.id}`)}
      onToggleJoin={() => toggleJoin(item.id)}
    />
  );

  return (
    <View style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Groups</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={MUTED} />
        <TextInput
          placeholder="Search groups…"
          placeholderTextColor={MUTED}
          style={styles.search}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
        {!!query && (
          <Pressable onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={18} color={MUTED} />
          </Pressable>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        <Segment
          options={["ALL", "VEG", "NONVEG"]}
          value={filter}
          onChange={(v) => setFilter(v as any)}
        />
        <Pressable
          onPress={() => setJoinedOnly((v) => !v)}
          style={[styles.chip, joinedOnly && styles.chipActive]}
        >
          <Ionicons
            name={joinedOnly ? "checkmark-circle" : "ellipse-outline"}
            size={14}
            color={joinedOnly ? "#fff" : ORANGE}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.chipText, joinedOnly && { color: "#fff" }]}>
            Joined only
          </Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(g) => g.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
          gap: 12,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={ORANGE}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={40} color={MUTED} />
            <Text style={styles.emptyTitle}>No groups found</Text>
            <Text style={styles.emptySub}>
              Try changing filters or keywords.
            </Text>
          </View>
        }
      />
    </View>
  );
}

/* ------------------------------ Components ------------------------------ */

function GroupCard({
  group,
  onPress,
  onToggleJoin,
}: {
  group: Group;
  onPress: () => void;
  onToggleJoin: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {group.cover ? (
        <Image source={{ uri: group.cover }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, { backgroundColor: "#f0f0f0" }]} />
      )}

      <View style={styles.cardBody}>
        <View style={styles.rowBetween}>
          <Text style={styles.groupName} numberOfLines={1}>
            {group.name}
          </Text>
          <TypePill type={group.type} />
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="people-outline" size={14} color={MUTED} />
          <Text style={styles.metaText}>{group.members} members</Text>
          <Ionicons
            name="cash-outline"
            size={14}
            color={MUTED}
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.metaText}>from ₹{group.priceFrom}</Text>
        </View>

        <View style={styles.menuRow}>
          {group.nextMenu.map((m, idx) => (
            <View key={idx} style={styles.menuChip}>
              <Text style={styles.menuChipText}>{m}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={onToggleJoin}
            style={[styles.joinBtn, group.isJoined && styles.leaveBtn]}
          >
            <Text
              style={[styles.joinText, group.isJoined && { color: ORANGE }]}
            >
              {group.isJoined ? "Leave" : "Join"}
            </Text>
          </Pressable>

          <Pressable onPress={onPress} style={styles.viewBtn}>
            <Text style={styles.viewText}>View</Text>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

function TypePill({ type }: { type: GroupType }) {
  const label = type === "VEG" ? "Veg" : "Non-Veg";
  return (
    <View
      style={[styles.typePill, type === "VEG" ? styles.veg : styles.nonveg]}
    >
      <Text style={styles.typeText}>{label}</Text>
    </View>
  );
}

function Segment({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={styles.segmentWrap}>
      {options.map((o) => {
        const active = o === value;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            style={[
              styles.segmentBtn,
              active ? styles.segmentActive : styles.segmentInactive,
            ]}
          >
            <Text
              style={[
                styles.segmentLbl,
                active ? { color: "#fff" } : { color: ORANGE },
              ]}
            >
              {o === "NONVEG" ? "Non-Veg" : o}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* --------------------------------- Styles --------------------------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  header: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  title: { fontSize: 22, fontWeight: "800", color: "#1A1A1A" },

  searchWrap: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  search: { flex: 1, color: "#111" },

  filtersRow: {
    paddingHorizontal: 16,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  segmentWrap: {
    flexDirection: "row",
    backgroundColor: "#F6E4D7",
    borderRadius: 12,
    padding: 4,
  },
  segmentBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  segmentActive: { backgroundColor: ORANGE },
  segmentInactive: { backgroundColor: "transparent" },
  segmentLbl: { fontWeight: "800", fontSize: 12, letterSpacing: 0.3 },

  chip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ORANGE,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  chipActive: { backgroundColor: ORANGE },
  chipText: { color: ORANGE, fontWeight: "700" },

  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BORDER,
  },
  cover: { width: "100%", height: 140 },
  cardBody: { padding: 12 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#151515",
    flex: 1,
    paddingRight: 8,
  },

  typePill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  veg: { backgroundColor: "#E4F6E8" },
  nonveg: { backgroundColor: "#FFE7E4" },
  typeText: { fontSize: 11, fontWeight: "800", color: "#333" },

  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  metaText: { color: MUTED, fontSize: 12 },

  menuRow: { flexDirection: "row", gap: 6, marginTop: 8, flexWrap: "wrap" },
  menuChip: {
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  menuChipText: { fontSize: 11, fontWeight: "700", color: "#333" },

  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },
  joinBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  leaveBtn: { backgroundColor: "#FFE1CE" },
  joinText: { color: ORANGE, fontWeight: "800" },

  viewBtn: {
    flex: 1,
    backgroundColor: ORANGE,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    flexDirection: "row",
    gap: 6,
  },
  viewText: { color: "#fff", fontWeight: "800" },

  empty: { alignItems: "center", paddingTop: 60, gap: 6 },
  emptyTitle: { fontWeight: "800", fontSize: 16, color: "#222" },
  emptySub: { color: MUTED },
});
