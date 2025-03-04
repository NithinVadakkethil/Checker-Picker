import React from "react";
import { View } from "react-native";
import OrderHeader from "./OrderHeader";
// import ProductDetails from "./ProductDetails";
import ProductDetails from "./ProductDetails";
import StatusInfo from "../StatusInfo";
// import LocationInfo from "./LocationInfo";

const Card = ({ order }) => {
  const {
    orderNo,
    productName,
    availableQty,
    expiryDate,
    status,
    uom,
    imageUrl,
    fromZone,
    toArea,
    qty,
    hasLocationInfo,
  } = order;

  return (
    <View className="mb-4 p-4 bg-white rounded-sm overflow-hidden">
      {/* <OrderHeader orderNo={orderNo} imageUrl={imageUrl} /> */}

      <ProductDetails
          productName={productName ? productName : ''}
          availableQty={availableQty ? availableQty : ''}
          expiryDate={expiryDate ? expiryDate : ''}
          orderNo={"1234567"}
          fromZone={hasLocationInfo ? fromZone : null}
          status={status ? status : ''}
          uom={uom ? uom : ''}
          qty={100}
        />
    </View>
  );
};

export default Card;
