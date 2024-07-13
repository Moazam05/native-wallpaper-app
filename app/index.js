import { View, Text, StatusBar, Image, StyleSheet } from "react-native";
import React from "react";
import { wp, hp } from "../helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.bgImg}
        resizeMode="cover"
      />
      {/* Linear Gradient */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={{
          flex: 1,
        }}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
      </Animated.View>
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

  gradient: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
    bottom: 0,
  },
});

export default WelcomeScreen;
