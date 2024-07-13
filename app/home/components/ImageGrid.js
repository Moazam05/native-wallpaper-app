import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { wp } from "../../../helpers/common";

const ImageGrid = ({ images }) => {
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={2}
        renderItem={({ item }) => <ImageCard item={item} />}
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
