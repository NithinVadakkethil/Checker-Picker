import { View, Text } from 'react-native'
import React from 'react'
import Success from "../../assets/icons/success.svg"
import Error from "../../assets/icons/error.svg"

const ToastContainer = ({message, type}) => {
  return (
    <View className={`flex-row items-center ${type === "Success" ? 'bg-[#F2F9D9]' : 'bg-[#F9D9D9]'} rounded-full px-5 py-3 shadow-lg`}>
      {type === "Success" ? <Success size={24}/> : <Error size={24}/>}
      <Text className={`${type === "Success" ? 'text-[#0DA858]' : 'text-[#A80D0D]'} text-lg font-semibold ml-3`}>{message || "message"}</Text>
    </View>
  )
}

export default ToastContainer