import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { hp, wp } from "../../helpers/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { theme } from "../../constants/theme";
import { Entypo, Octicons } from "@expo/vector-icons";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const uri = item?.webformatURL;
  const [status, setStatus] = useState("loading");

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
      <View style={getSize()}>
        <View style={styles.loading}>
          {status === "loading" && (
            <ActivityIndicator color="white" size="large" />
          )}
        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]} // Execute getSize() to get the style object
          source={{ uri }}
          onLoad={onLoad}
        />
      </View>

      <View style={styles.buttons}>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => {
              router.back();
            }}
          >
            <Octicons name="x" size={22} color="white" />
          </Pressable>
        </View>
        <View>
          <Pressable style={styles.button}>
            <Octicons name="download" size={22} color="white" />
          </Pressable>
        </View>

        <View>
          <Pressable style={styles.button}>
            <Entypo name="share" size={22} color="white" />
          </Pressable>
        </View>
      </View>
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

  loading: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },

  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(225,225,225,0.2)",
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
});

export default ImageScreen;
