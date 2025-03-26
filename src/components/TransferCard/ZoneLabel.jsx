import React from "react";
import { View, Text } from "react-native";
const ZoneLabel = ({ prefix, zone, color, dateTime, textAlign }) => {
  const breakLongWords = (text, maxLength = 18) => {
    if (!text) return "";
    return text.length > maxLength ? text.match(new RegExp(`.{1,${maxLength}}`, "g")).join("\n") : text;
  };
  return (
    <View className="flex-row items-baseline pt-3">
      <Text className="text-xs text-gray-600">{prefix} </Text>
      <Text style={{ color, textAlign: textAlign ? textAlign : "" }} className={`font-bold ${dateTime ? 'text-base' : 'text-sm'}`}>
        {breakLongWords(zone || dateTime)}
      </Text>
    </View>
  );
};

export default ZoneLabel;