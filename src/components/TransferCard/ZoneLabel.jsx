import React from "react";
import { View, Text, Dimensions } from "react-native";

const ZoneLabel = ({ prefix, zone, color, dateTime, textAlign, reAssigned }) => {
  const screenWidth = Dimensions.get("window").width;

  // Dynamically adjust maxLength based on screen width
  const maxLength = screenWidth < 360 ? 12 : screenWidth < 480 ? 18 : 30;

  const breakLongWords = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.match(new RegExp(`.{1,${maxLength}}`, "g")).join("\n")
      : text;
  };

  return (
    <View className="flex-row items-baseline pt-3">
      <Text className="text-xs text-gray-600">{prefix} </Text>
      <Text
        style={{ color, textAlign: textAlign ? textAlign : "left" }}
        className={`font-bold ${dateTime ? "text-base" : "text-sm"}`}
      >
        {breakLongWords(zone || dateTime, reAssigned ? "" : maxLength)}
      </Text>
    </View>
  );
};

export default ZoneLabel;
