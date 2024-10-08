import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";

const ImageCard = ({ item, index, columns, router }) => {
  const isLastInRow = (index + 1) % columns === 0;

  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;

    return { height: getImageSize(width, height) };
  };

  return (
    <Pressable
      style={[
        styles.imageWrapper,
        !isLastInRow && styles.spacing, // isLastInRow = False (marginRight)
        !isLastInRow && styles.spacingTwo, // isLastInRow = False (marginLeft)
        isLastInRow && styles.spacing, //  isLastInRow = True  (marginRight)
      ]}
      onPress={() => {
        router.push({
          pathname: "home/image",
          params: { ...item },
        });
      }}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={item?.webformatURL}
        transition={100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: "100%",
  },

  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },

  spacing: {
    marginRight: wp(2),
  },

  spacingTwo: {
    marginLeft: wp(2),
  },
});

export default ImageCard;
