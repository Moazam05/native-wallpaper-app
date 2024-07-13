import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
// Custom Imports
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import Categories from "./components/Categories";
import { apiCall } from "../../api";

const Home = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 10 : 30;

  const searchInputRef = useRef(null);

  // states
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1, append: true }) => {
    let result = await apiCall(params);
    if (result.success && result.data?.hits) {
      if (append) {
        setImages([...images, ...result.data.hits]);
      } else {
        setImages([...result.data.hits]);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          gap: 15,
        }}
      >
        {/* Search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for images..."
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => setSearch(text)}
            ref={searchInputRef}
          />
          {search.length > 0 && (
            <Pressable>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <View>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* Images Masonry Grid */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },

  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(4),
    padding: 10,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.neutral(0.1),
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: hp(2),
    color: theme.colors.neutral(0.7),
  },
});

export default Home;
