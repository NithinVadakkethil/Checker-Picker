import { View } from 'react-native'
import React from 'react'
import OrderStatus from './OrderStatus'
import OrderNumber from './OrderNumber'
import Arrow from './Arrow'

const OrderStatusCard = (props) => {
  return (
    <View className="bg-white rounded shadow-sm p-4 my-2">
      <View className="flex-row justify-between items-center">
        <OrderStatus status={props.status} />
        <OrderNumber orderNumber={props.orderNumber}/>
        <Arrow />
      </View>
    </View>
  )
}

export default OrderStatusCard