import { View, Text } from 'react-native'
import React from 'react'
import OrderStatus from './OrderStatus'
import OrderNumber from './OrderNumber'
import Arrow from './Arrow'

const OrderStatusCard = () => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm w-full">
      <View className="flex-row justify-between items-center">
        <OrderStatus status="Completed" />
        <OrderNumber orderNumber="1234567" />
        <Arrow />
      </View>
    </View>
  )
}

export default OrderStatusCard