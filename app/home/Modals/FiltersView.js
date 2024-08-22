import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { capitalizeFirstLetter, hp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const SectionView = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text>{content}</Text>
    </View>
  );
};

export const CommonFiltersRow = ({ data, filters, setFilters, filterName }) => {
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => {
          const isActive = filters && filters[filterName] === item;

          const backgroundColor = isActive
            ? theme.colors.neutral(0.7)
            : "white";

          const color = isActive ? "white" : theme.colors.neutral(0.7);

          return (
            <Pressable
              key={index}
              onPress={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  [filterName]: item,
                }))
              }
              style={[styles.outlineButton, { backgroundColor }]}
            >
              <Text style={[styles.outlineButtonText, { color }]}>
                {capitalizeFirstLetter(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export const ColorFilters = ({ data, filters, setFilters, filterName }) => {
  return (
    <View style={styles.flexRowWrapTwo}>
      {data &&
        data.map((item, index) => {
          const isActive = filters && filters[filterName] === item;

          return (
            <Pressable
              key={index}
              onPress={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  [filterName]: item,
                }))
              }
            >
              <View style={[styles.colorWrapper]}>
                <View style={[styles.color, { backgroundColor: item }]}>
                  {isActive && (
                    <MaterialCommunityIcons
                      name="check"
                      size={24}
                      color="white"
                    />
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },

  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral(0.8),
  },
  flexRowWrap: {
    flexDirection: "row",
    flexWrap: Platform.select({
      ios: "nowrap",
      android: "wrap",
    }),
    gap: 8,
  },

  outlineButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },

  outlineButtonText: {
    fontSize: hp(1.8),
    color: theme.colors.neutral(0.6),
  },

  flexRowWrapTwo: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorWrapper: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
