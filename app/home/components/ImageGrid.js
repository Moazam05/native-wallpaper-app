import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { wp } from "../../../helpers/common";

const ImageGrid = ({ images }) => {
  const numColumns = 2;

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={numColumns}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} columns={numColumns} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
});

export default ImageGrid;
