import { Pressable, StyleSheet, Text, View } from "react-native";
import { capitalizeFirstLetter, hp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";

export const SectionView = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text>{content}</Text>
    </View>
  );
};

export const CommonFiltersRow = ({ data, filters, setFilters, filterName }) => {
  console.log("data", data);
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                [filterName]: item,
              }))
            }
          >
            <Text style={styles.filterText}>{capitalizeFirstLetter(item)}</Text>
          </Pressable>
        ))}
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
});
