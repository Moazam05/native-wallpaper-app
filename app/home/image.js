import { View, Text, StyleSheet, Button, Platform } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { wp } from "../../helpers/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { theme } from "../../constants/theme";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const uri = item?.webformatURL;
  const [status, setStatus] = useState("");

  const onLoad = () => {
    setStatus("");
  };

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;

    const maxWidth = Platform.OS === "web" ? 300 : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      // Portrait mode
      calculatedWidth = maxWidth;
      calculatedHeight = calculatedWidth / aspectRatio;
    } else {
      // Landscape mode
      calculatedHeight = maxWidth / aspectRatio;
      calculatedWidth = maxWidth;
    }

    return {
      height: calculatedHeight,
      width: calculatedWidth,
    };
  };

  return (
    <BlurView style={styles.container} tint="dark" intensity={60}>
      <View>
        <Image
          transition={100}
          style={[styles.image, getSize()]} // Execute getSize() to get the style object
          source={{ uri }}
          onLoad={onLoad}
        />
      </View>

      <Button title="Go Back" onPress={() => router.back()} />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(225,225,225,0.1)",
    borderColor: "rgba(225,225,225,0.1)",
  },
});

export default ImageScreen;
