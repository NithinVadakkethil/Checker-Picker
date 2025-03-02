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
          productName={productName}
          availableQty={availableQty}
          expiryDate={expiryDate}
          orderNo={!hasLocationInfo ? orderNo : null}
          fromZone={hasLocationInfo ? fromZone : null}
          status={status}
          uom={uom}
          qty={hasLocationInfo ? qty : null}
        />
    </View>
  );
};

export default Card;
