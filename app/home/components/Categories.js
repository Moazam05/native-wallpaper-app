import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { categoriesData } from "../../../constants/category";
import { theme } from "../../../constants/theme";
import { hp, wp } from "../../../helpers/common";
import Animated, { FadeInRight } from "react-native-reanimated";

const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator={false}
      data={categoriesData}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  );
};

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  let backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        onPress={() => handleChangeCategory(isActive ? null : title)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    gap: 6,
  },
  category: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    borderCurve: "continuous",
  },
  title: {
    color: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});

export default Categories;
