import { Text, Dimensions } from "react-native";
import React from "react";

const ProductName = ({ productName, badge, status }) => {
  const screenWidth = Dimensions.get("window").width;

  // Dynamically adjust maxLength based on screen width
  const maxLength =
    screenWidth < 360
      ? 15
      : screenWidth < 400 && badge
      ? 25
      : screenWidth < 400 && !badge && status !== "Reassigned"
      ? 31
      : screenWidth < 400 && !badge && status === "Reassigned"
      ? 28
      : screenWidth < 480
      ? 40
      : 60;

  const breakLongWords = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.match(new RegExp(`.{1,${maxLength}}`, "g")).join("\n")
      : text;
  };
  return (
    <>
      <Text className="text-[13px] font-normal text-[#00389D]">
        {breakLongWords(productName, maxLength)} {badge}
      </Text>
    </>
  );
};

export default ProductName;
