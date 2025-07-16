import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import LabelInfo from "./LabelInfo";
import ProductName from "./ProductName";
import OrderHeader from "./OrderHeader";
import Edit from "../../assets/icons/Edit.svg";
import ZoneLabel from "../TransferCard/ZoneLabel";
import Seperation from "../../assets/icons/seperationArrow.svg";
import Plus from "../../assets/icons/plus.svg";
import Calender from "../../assets/icons/calendar.svg";
import dayjs from "dayjs";

const ProductDetails = ({
  productName,
  availableQty,
  expiryDate,
  orderNo,
  fromZone,
  status,
  uom,
  qty,
  onPress,
  fromColor,
  toColor,
  toZone,
  onStatusChange,
  moveId,
  doneFlag,
  type,
  pickerName,
  reAssigned,
  activeName,
  selectedDate,
  saleId,
  onOrderStatusChange,
  orderStaus,
  loading,
  batchNumber,
  deliveryDate
}) => {
  const ReAsgnBadge = () => {
    return (
      <View className="flex items-center bg-re-badge rounded-full py-0.5 px-2">
        <Text className="text-xs font-medium text-[#004CAB]">Reassigned</Text>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <View
        className={`flex-row justify-between items-center border-b border-[#CBCBCB]/30 ${
          !orderNo && "pb-4"
        }`}
      >
        {orderNo && (
          <>
            <OrderHeader orderNo={orderNo} />
            {type === "Checker" && doneFlag && !orderStaus && (
              <TouchableOpacity onPress={() => onOrderStatusChange(saleId)}>
                <View className="bg-[#DAE1E3] px-5 py-1 rounded-[4px] shadow-sm shadow-black/10">
                  {loading ? (
                    <ActivityIndicator size="small" color="#004CAB" />
                  ) : (
                    <Text className="text-[#000000E5] text-center text-base font-medium">
                      Done
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            {orderStaus && type === "Checker" && (
              <View className="bg-[#5EAB00] px-5 py-1 rounded-[4px]">
                <Text className="text-[#FFFFFF] text-center text-base font-medium">
                  Done
                </Text>
              </View>
            )}
            {type === "Checker" &&
              status !== "Reassigned" &&
              status !== "Done" &&
              activeName !== "Reciepts" && (
                <TouchableOpacity onPress={onPress} className="pb-1">
                  <Plus height={20} width={20} />
                </TouchableOpacity>
              )}
          </>
        )}
      </View>
      {!orderNo &&
        type === "Checker" &&
        status !== "Reassigned" &&
        status !== "Done" &&
        activeName !== "Reciepts" && (
          <View className="items-end pt-2">
            <TouchableOpacity onPress={onPress} className="pb-1">
              <Plus height={20} width={20} />
            </TouchableOpacity>
          </View>
        )}
      {type === "Checker" ? (
        <View className="flex-row justify-between items-center pt-2.5">
          <ProductName productName={productName} status={status} />
          {status === "Done" && activeName !== "Reciepts" ? (
            <View className="bg-[#FFF] border border-[#03BA03] px-5 py-1 rounded-[4px]">
              <Text className="text-[#03BA03] text-center text-base font-medium">
                Verified
              </Text>
            </View>
          ) : status === "Reassigned" ? (
            <View className="bg-[#FFF] border border-[#FF5353] px-5 py-1 rounded-[4px]">
              <Text className="text-[#FF5353] text-center text-base font-medium">
                Reassigned
              </Text>
            </View>
          ) : (
            activeName !== "Reciepts" && (
              <TouchableOpacity onPress={() => onStatusChange(moveId)}>
                <View className="bg-[#DAE1E3] px-5 py-1 rounded-[4px] shadow-sm shadow-black/10">
                  {loading ? (
                    <ActivityIndicator size="small" color="#004CAB" />
                  ) : (
                    <Text className="text-[#000000E5] text-center text-base font-medium">
                      Verify
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
      ) : (
        <View className="flex-row justify-between items-center pt-2.5">
          <ProductName
            productName={productName}
            badge={reAssigned ? <ReAsgnBadge /> : null}
          />
          {activeName !== "Reciepts" && status === "Done" ? (
            <View className="bg-[#FFF] border border-[#03BA03] px-5 py-1 rounded-[4px]">
              <Text className="text-[#03BA03] text-center text-base font-medium">
                Done
              </Text>
            </View>
          ) : (
            activeName !== "Reciepts" && (
              <TouchableOpacity onPress={() => onStatusChange(moveId)}>
                <View className="bg-[#DAE1E3] px-5 py-1 rounded-[4px] shadow-sm shadow-black/10">
                  {loading ? (
                    <ActivityIndicator size="small" color="#004CAB" />
                  ) : (
                    <Text className="text-[#000000E5] text-center text-base font-medium">
                      Done
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
      )}
      {type === "Checker" && activeName !== "Reciepts" && (
        <View className="flex-row justify-between pt-1">
          <LabelInfo label={"Picker"} value={pickerName} />
          {/* <LabelInfo label={"Expiry Date"} value={batchNumber} /> */}
          <View className="flex-row items-center ">
            <Text className="text-xs text-[#4D4D4D] font-normal">
              Expiry Date:{" "}
            </Text>
            <Text className="text-[#000] font-semibold text-sm">
              {batchNumber}
            </Text>
          </View>
        </View>
      )}
      <View className="flex-row justify-between py-2">
        {activeName !== "Reciepts" ? (
          <View className="flex-col gap-2">
            {/* <LabelInfo label={"Available Qty"} value={availableQty} /> */}
            <View className="flex-row items-center ">
              <Text className="text-xs text-[#4D4D4D] font-normal">
                Available Qty:{" "}
              </Text>
              <Text className="text-[#000] font-semibold text-sm">
                {availableQty}
              </Text>
            </View>
            {type === "Checker" && activeName === "Scheduled Delivery" && (
              <View className="flex-row items-center ">
                <Text className="text-xs text-[#4D4D4D] font-normal">
                  Date:{" "}
                </Text>
                <Text className="text-[#000] font-semibold text-sm">
                  {deliveryDate}
                </Text>
              </View>
            )}
            {type !== "Checker" && (
              // <LabelInfo label={"Expiry Date"} value={batchNumber} />
              <View className="flex-row items-center ">
                <Text className="font-normal text-xs mr-1">Expiry Date:</Text>
                <Text className="text-[#000] font-semibold text-sm">
                  {batchNumber}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View className="flex-row items-center">
            <LabelInfo label={"Expiry Date"} />
            {status === "Done" ? (
              <Text>Updated</Text>
            ) : (
              <TouchableOpacity
                className="flex-row items-center justify-between w-[160px] border border-gray-300 rounded-md px-3 py-1 bg-white"
                onPress={onPress} // or your desired handler
              >
                <Text className="text-base font-semibold text-black">
                  {selectedDate
                    ? dayjs(selectedDate)?.format("DD/MM/YYYY")
                    : "DD/MM/YYYY"}
                </Text>
                <Calender />
              </TouchableOpacity>
            )}
          </View>
        )}
        {activeName !== "Reciepts" ? (
          <LabelInfo label={"UOM"} value={`${qty} ${uom}`} />
        ) : (
          <View className="flex-row items-center">
            <Text className="font-normal text-xs">Qty </Text>
            <Text className="text-[#000] font-bold text-xl">{qty}</Text>
          </View>
        )}
      </View>
      {/* <View className="flex-row justify-between items-center">
        {activeName !== "Reciepts" ? (
          <LabelInfo label={"Batch No"} value={expiryDate} />
        ) : (
          <LabelInfo label={"Picker"} value={pickerName} />
        )}
        {activeName !== "Reciepts" ? (
          <Text>
            <Text className="font-normal text-xs">Qty </Text>
            <Text className="text-[#000] font-bold text-xl">{qty}</Text>
          </Text>
        ) : (
          <LabelInfo label={"Batch No"} value={expiryDate} />
        )}
      </View> */}

      <View className="flex-row justify-between items-center flex-wrap">
        {activeName !== "Reciepts" ? (
          <LabelInfo label={"Batch No"} value={expiryDate} />
        ) : (
          <LabelInfo label={"Picker"} value={pickerName} />
        )}

        {activeName !== "Reciepts" ? (
          <View className="flex-row items-center ">
            <Text className="text-xs text-[#4D4D4D] font-normal">Qty: </Text>
            <Text className="text-[#000] font-semibold text-sm">{qty}</Text>
          </View>
        ) : (
          <LabelInfo label={"Batch No"} value={expiryDate} />
        )}
      </View>

      <View className={`flex-row justify-between items-end`}>
        <ZoneLabel prefix={"From"} zone={fromZone} color={fromColor} />
        <Seperation height={20} width={20} />
        <ZoneLabel
          prefix={"To"}
          zone={toZone}
          color={toColor}
          textAlign={"right"}
        />
      </View>
    </View>
  );
};

export default ProductDetails;
