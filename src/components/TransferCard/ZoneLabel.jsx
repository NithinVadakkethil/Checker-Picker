import React from "react";
import { View, Text } from "react-native";

const ZoneLabel = ({ prefix, zone, color, dateTime }) => {
  return (
    <View className="flex-row items-baseline pt-3">
      <Text className="text-xs text-gray-600">{prefix} </Text>
      <Text style={{ color }} className={`font-bold ${dateTime ? 'text-base' : 'text-xl'}`}>
        {zone || dateTime}
      </Text>
    </View>
  );
};

export default ZoneLabel;
