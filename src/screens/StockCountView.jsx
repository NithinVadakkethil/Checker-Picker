import { View } from 'react-native'
import React from 'react'
import StockTable from '../components/Table/StockTable'

const StockCountView = () => {
  return (
    <View className='flex-1'>
      <StockTable />
    </View>
  )
}

export default StockCountView