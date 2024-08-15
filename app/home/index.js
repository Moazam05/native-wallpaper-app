import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
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
import { useRouter } from "expo-router";

var page = 1;

const Home = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 10 : 30;

  const router = useRouter();
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const scrollRef = useRef(null);

  // states
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState(null);
  const [isEndReached, setIsEndReached] = useState(false);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    // clear search
    setSearch("");
    searchInputRef.current.clear();
    page = 1;
    setImages([]);

    let params = { page, append: false, ...filters };
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
      fetchImages({ page, q: text, append: false, ...filters });
    }

    if (text.length === 0) {
      // show by default images
      page = 1;
      setImages([]);
      fetchImages({ page, append: false, ...filters });
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
    if (filters) {
      page = 1;
      setImages([]);
      let params = {
        page,
        append: false,
        ...filters,
      };
      if (activeCategory) {
        params.category = activeCategory;
      }
      if (search) {
        params.q = search;
      }
      fetchImages(params);
    }

    closeFiltersModal();
  };

  const resetFilters = () => {
    if (filters) {
      page = 1;
      setFilters(null);
      setImages([]);
      let params = {
        page,
        append: false,
      };
      if (activeCategory) {
        params.category = activeCategory;
      }
      if (search) {
        params.q = search;
      }
      fetchImages(params);
    }
    closeFiltersModal();
  };

  const clearThisFilter = (filter) => () => {
    let newFilters = { ...filters };
    delete newFilters[filter];
    setFilters(newFilters);
    // fetch images
    page = 1;
    setImages([]);
    let params = {
      page,
      append: false,
      ...newFilters,
    };
    if (activeCategory) {
      params.category = activeCategory;
    }
    if (search) {
      params.q = search;
    }
    fetchImages(params);
  };

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        console.log("scrolling", page);
        // fetch next page
        ++page;
        let params = {
          page,
          append: true,
          ...filters,
        };
        if (activeCategory) {
          params.category = activeCategory;
        }
        if (search) {
          params.q = search;
        }
        fetchImages(params);
        setIsEndReached(true);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  const handleScrollUp = () => {
    scrollRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
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
        onScroll={handleScroll}
        scrollEventThrottle={5} // it takes as ms
        ref={scrollRef}
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

        {/* Filters */}
        {filters && (
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10,
                marginBottom: 3,
              }}
            >
              Filters Applied
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: 7,
              }}
            >
              {Object.keys(filters).map((filter, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 5,
                      margin: 5,
                      backgroundColor: theme.colors.neutral(0.1),
                      borderRadius: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {filter === "colors" ? (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: filters[filter],
                          marginRight: 5,
                          borderRadius: 5,
                        }}
                      ></View>
                    ) : (
                      <Text
                        style={{ color: theme.colors.neutral(0.7), padding: 2 }}
                      >
                        {filters[filter]}
                      </Text>
                    )}

                    {/* close icon to remove filter */}
                    <Pressable onPress={clearThisFilter(filter)}>
                      <Ionicons
                        name="close"
                        size={16}
                        color={theme.colors.neutral(0.7)}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Images Masonry Grid */}
        <View>
          {images?.length > 0 && <ImageGrid images={images} router={router} />}
        </View>

        {/* Loading */}
        <View
          style={{
            marginBottom: 70,
            marginTop: images.length > 0 ? 10 : 70,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
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
