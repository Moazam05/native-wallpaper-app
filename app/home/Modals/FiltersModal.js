import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { capitalizeFirstLetter, hp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import { ColorFilters, CommonFiltersRow, SectionView } from "./FiltersView";
import { filtersType } from "../../../constants/category";

const FiltersModal = ({
  modalRef,
  filters,
  setFilters,
  onClose,
  onApply,
  onReset,
}) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>

          {/* FILTERS SECTION */}
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];

            return (
              <View key={index}>
                <SectionView
                  title={capitalizeFirstLetter(sectionName)}
                  content={sectionView({
                    data: filtersType[sectionName],
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </View>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

// FILTERS SECTION
const sections = {
  order: (props) => <CommonFiltersRow {...props} />,
  orientation: (props) => <CommonFiltersRow {...props} />,
  type: (props) => <CommonFiltersRow {...props} />,
  colors: (props) => <ColorFilters {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const containerStyle = [
    StyleSheet.absoluteFillObject,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "100%",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
});

export default FiltersModal;
