import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

// width percentage
export const wp = (percentage) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

// height percentage
export const hp = (percentage) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getImageSize = (width, height) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    // portrait
    return 300;
  } else {
    // square
    return 200;
  }
};

export function capitalizeFirstLetter(str) {
  if (!str) return ""; // Handle empty string case
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
