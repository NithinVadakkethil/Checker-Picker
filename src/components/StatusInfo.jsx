import React from "react";
import { View, Text, Image } from "react-native";
import LabelInfo from "./DetailCard/LabelInfo";

const StatusInfo = ({ status, uom, qty, toArea }) => {
  return (
    <View className="items-end">
      <View className="mb-2">
        <View className="bg-[#FFF] border border-[#03BA03] rounded-[4px]">
          <Text className="text-[#03BA03] text-center text-base font-medium">{status}</Text>
        </View>

        <View className="flex-row items-center">
          <LabelInfo label={"UOM"} value={uom}/>

          {!toArea && (
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/32230cf2-f06c-4d21-881a-20bd06349fc5?placeholderIfAbsent=true&apiKey=05f15ed087014a6a9f74a6d6a78953d9",
              }}
              className="w-6 h-6"
              resizeMode="contain"
            />
          )}
        </View>

        {qty && (
          <View className="mt-1">
            <Text>
              <Text className="font-normal text-xs">Qty </Text>
              <Text className="text-[#000] font-bold text-xl">{qty}</Text>
            </Text>
          </View>
        )}
      </View>

      {toArea && (
        <View>
          <Text>
            <Text className="font-normal text-xs text-black">To </Text>
            <Text className="text-sm text-[#944654]">{toArea}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default StatusInfo;
