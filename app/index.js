import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { wp, hp } from "../helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";

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
        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Pixels</Text>
          <Text style={styles.punchline}>Every Pixel Tells a Story</Text>

          <View>
            <Pressable style={styles.startButton}>
              <Text style={styles.startText}>Start Explore</Text>
            </Pressable>
          </View>
        </View>
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

  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 14,
  },

  title: {
    fontSize: hp(7),
    color: theme.colors.neutral(0.9),
    fontWeight: theme.fontWeights.bold,
  },

  punchline: {
    fontSize: hp(2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeights.medium,
  },

  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },

  startText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.medium,
    fontSize: hp(3),
    letterSpacing: 1,
  },
});

export default WelcomeScreen;
