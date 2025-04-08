import { View, Text } from 'react-native'
import React from 'react'
import Success from "../../assets/icons/success.svg"
import Error from "../../assets/icons/error.svg"
import ConfirmationDialog from './ConfirmationDialog'

const ToastContainer = ({message, type}) => {
  return (
    // <View className={`flex-row items-center ${type === "Success" ? 'bg-[#F2F9D9]' : 'bg-[#F9D9D9]'} rounded-full px-5 py-3 shadow-lg`}>
    //   {type === "Success" ? <Success size={24}/> : <Error size={24}/>}
    //   <Text className={`${type === "Success" ? 'text-[#0DA858]' : 'text-[#A80D0D]'} text-lg font-semibold ml-3`}>{message || "message"}</Text>
    // </View>
    <View className={`flex-row items-center rounded-full px-5 py-3 shadow-lg`}>
    <ConfirmationDialog
            // onConfirm={handleConfirm}
            // onCancel={handleCancel}
            message="Are you sure?"
            confirmText="Yes"
            cancelText="No"
            warningIconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/dc61464c4c681d05eeb5913f9bb987bdab9164b1"
          />
    </View>
  )
}

export default ToastContainer