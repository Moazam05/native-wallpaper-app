import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
// Custom Imports
import { theme } from "../../constants/theme";
import { wp, hp } from "../../helpers/common";
import Categories from "./components/Categories";
import { apiCall } from "../../api";
import ImageGrid from "./components/ImageGrid";
import { debounce } from "lodash";
import FiltersModal from "./Modals/FiltersModal";

var page = 1;

const Home = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 10 : 30;

  const searchInputRef = useRef(null);
  const modalRef = useRef(null);

  // states
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState(null);

  console.log("filters", filters);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    // clear search
    setSearch("");
    searchInputRef.current.clear();
    page = 1;
    setImages([]);

    let params = { page, append: false };
    if (category) {
      params.category = category;
    }
    fetchImages(params);
  };

  const fetchImages = async (params = { page: 1, append: false }) => {
    let result = await apiCall(params);
    console.log("params", params);

    if (result.success && result.data?.hits) {
      if (params.append) {
        setImages((prevImages) => [...prevImages, ...result.data.hits]);
      } else {
        setImages([...result.data.hits]);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);

    setActiveCategory(null);

    if (text.length > 2) {
      // then fetch images
      page = 1;
      setImages([]);
      fetchImages({ page, q: text });
    }

    if (text.length === 0) {
      // show by default images
      page = 1;
      setImages([]);
      fetchImages({ page });
    }
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current.clear();
    fetchImages({ page });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const openFiltersModal = () => {
    modalRef.current?.present();
  };

  const closeFiltersModal = () => {
    modalRef.current?.close();
  };

  const applyingFilters = () => {
    console.log("applying filters");
    closeFiltersModal();
  };

  const resetFilters = () => {
    console.log("reset filters");
    closeFiltersModal();
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable onPress={openFiltersModal}>
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
            // value={search}
            onChangeText={handleTextDebounce}
            ref={searchInputRef}
          />
          {search.length > 0 && (
            <Pressable>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
                onPress={clearSearch}
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
        <View>{images?.length > 0 && <ImageGrid images={images} />}</View>
      </ScrollView>

      {/* Filters Model */}
      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFiltersModal}
        onApply={applyingFilters}
        onReset={resetFilters}
      />
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
