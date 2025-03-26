import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { OrderStatusCard, CreateBottomSheet } from "../../components";
import { apiGet } from "../../utils/apiService";
import Add from "../../assets/icons/Add.svg";
import { Text } from "react-native-gesture-handler";

const SalesInvoice = ({ onPress }) => {
  const createBottomSheetRef = useRef(null);
  const [invoices, setInvoices] = useState([{
    "id": 1678,
    "order_no": "S08174",
    "location_id": 8,
    "location_name": "WH/Stock",
    "location_dest_id": 5,
    "location_dest_name": "Partners/Customers",
    "product_lines": [
        {
            "move_id": 17536,
            "product_id": 2645,
            "product_name": "[1030]  MINIS - 24X500G ",
            "expiry_date": "",
            "qty": 1.0,
            "uom_name": "Pcs",
            "uom_id": 1,
            "state": "picker_pending",
            "reassign_reason": false,
            "lot_id": "",
            "lot_name": ""
        }
    ],
    "state": "picker_pending"
},
{
    "id": 1680,
    "order_no": "S08175",
    "location_id": 8,
    "location_name": "WH/Stock",
    "location_dest_id": 5,
    "location_dest_name": "Partners/Customers",
    "product_lines": [
        {
            "move_id": 17538,
            "product_id": 2645,
            "product_name": "[1030]  MINIS - 24X500G ",
            "expiry_date": "",
            "qty": 1.0,
            "uom_name": "Pcs",
            "uom_id": 1,
            "state": "picker_pending",
            "reassign_reason": false,
            "lot_id": "",
            "lot_name": ""
        },
        {
            "move_id": 17539,
            "product_id": 3526,
            "product_name": "[1094] \"GALAXY JEWELS 8X400G\t\" ",
            "expiry_date": "",
            "qty": 1.0,
            "uom_name": "Pcs",
            "uom_id": 1,
            "state": "picker_pending",
            "reassign_reason": false,
            "lot_id": "",
            "lot_name": ""
        }
    ],
    "state": "checker_reassign"
}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await apiGet("/checker/sale_all_tasks");
        // setInvoices(data.payload);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Function to close the bottom sheet
  const createSheetClose = () => {
    createBottomSheetRef.current.close();
  };

  const createSheetOpen = () => {
    createBottomSheetRef.current.open();
  };

  console.log("invoices--->", invoices)

  return (
    <View className="flex-1 relative">
      {loading ? (
        <Text>"loading....."</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress("", "Sales Invoice", item)}>
              <OrderStatusCard
                status={item.state === "checker_reassign" ? "Reassign" : "Completed"}
                orderNumber={item.order_no}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
      <TouchableOpacity
        onPress={createSheetOpen}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Add />
      </TouchableOpacity>
      <CreateBottomSheet
        onClose={createSheetClose}
        onOpen={createSheetOpen}
        bottomSheetRef={createBottomSheetRef}
      />
    </View>
  );
};

export default SalesInvoice;
