import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { wp } from "../../helpers/common";
import { useLocalSearchParams, useRouter } from "expo-router";

const ImageScree = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  console.log("item", item);
  return (
    <BlurView style={styles.container} tint="dark" intensity={60}>
      <Text>Image Screen</Text>

      <View style={{ marginTop: wp(2) }}>
        <Text
          onPress={() => {
            router.back();
          }}
        >
          Go Back
        </Text>
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
});

export default ImageScree;
