import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { wp } from "../../helpers/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";

const ImageScree = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const uri = item?.webformatURL;
  console.log("uri", uri);
  const [status, setStatus] = useState("");

  const onLoad = () => {
    setStatus("");
  };

  const getSize = () => {
    return {
      height: 200,
      width: 200,
    };
  };
  return (
    <BlurView style={styles.container} tint="dark" intensity={60}>
      <View style={[]}>
        <Image
          transition={100}
          style={[styles.image, getSize]}
          source={uri}
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
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: wp(2),
  },
});

export default ImageScree;
