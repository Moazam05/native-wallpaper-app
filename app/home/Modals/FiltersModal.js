import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

const FiltersModal = ({ modalRef }) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    // <View style={styles.container}>
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default FiltersModal;
