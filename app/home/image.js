import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { hp, wp } from "../../helpers/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { theme } from "../../constants/theme";
import { Entypo, Octicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const uri = item?.webformatURL;
  const fileName = item?.previewURL.split("/").pop();
  const imageUri = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

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

  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "You need to grant storage permission to download images."
        );
        return false;
      }
    } else if (Platform.OS === "ios") {
      const { status } = await MediaLibrary.requestPermissionsAsync(true); // Request both read and write access
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "You need to grant photo library permission to save images."
        );
        return false;
      }
    }
    return true;
  };

  const handleDownloadImage = async () => {
    const permissionGranted = await requestStoragePermission();
    if (!permissionGranted) return;

    setStatus("downloading");
    const uri = await downloadFile();

    if (uri) {
      showToast("Image downloaded successfully");
    } else {
      showToast("Failed to download image. Please try again.");
    }
  };

  const handleShareImage = async () => {
    setStatus("sharing");
    const uri = await downloadFile();
    if (uri) {
      await Sharing.shareAsync(uri);
      setStatus("");
    }
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUri, filePath);

      await MediaLibrary.createAssetAsync(uri);
      // const asset = await MediaLibrary.createAssetAsync(uri);
      // await MediaLibrary.createAlbumAsync("Download", asset, false);

      setStatus("");
      return uri;
    } catch (error) {
      console.log("Download error:", error.message);
      Alert.alert("Error", error.message);
      setStatus("");
      return null;
    }
  };

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig = {
    success: ({ text1, props, ...rest }) => (
      <View style={styles.toast}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
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
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable
            style={styles.button}
            onPress={() => {
              router.back();
            }}
          >
            <Octicons name="x" size={22} color="white" />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status === "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator color="white" size="small" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <Octicons name="download" size={22} color="white" />
            </Pressable>
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator color="white" size="small" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleShareImage}>
              <Entypo name="share" size={22} color="white" />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast config={toastConfig} visibilityTime={2500} />
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

  toast: {
    padding: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: theme.radius.xs,
  },

  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
});

export default ImageScreen;
