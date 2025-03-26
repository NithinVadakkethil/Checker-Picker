import { View, Text } from 'react-native'
import React from 'react'
import Success from "../../assets/icons/success.svg"
import Error from "../../assets/icons/error.svg"

const Banner = ({message, type}) => {
  return (
    <View className="flex-row items-center bg-[#F2F9D9] rounded-full px-5 py-3 shadow-lg">
      <Success size={24}/>
      <Text className="text-[#0DA858] text-lg font-semibold ml-3">{"Login success"}</Text>
    </View>
  )
}

export default Banner