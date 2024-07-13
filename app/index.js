import { View, Text, StatusBar, Image, StyleSheet } from "react-native";
import React from "react";
import { wp, hp } from "../helpers/common";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.bgImg}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
});

export default WelcomeScreen;
