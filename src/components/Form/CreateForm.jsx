import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import FormGroup from "./FormGroup";
import CloseIcon from "../../assets/icons/Close.svg";
import { useToast } from "react-native-toast-notifications";
import {
  apiGetAvailableProducts,
  apiGetDestinationLocations,
  apiCreateInternalTransfer,
} from "../../api/CommonService";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateForm = ({ onClose, onTransferCreated }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownFocus, setDropdownFocus] = useState({
    product_id: false,
    dest_location_id: false,
    uom_id: false,
    lot_id: false
  });

  const [formData, setFormData] = useState({
    product_id: "",
    uom_id: "",
    lot_id: "",
    quantity: "",
    dest_location_id: "",
    scheduled_date: new Date().toISOString().split("T")[0], // Default to today
  });

  // Fetch products and locations on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch products
      const productsResponse = await apiGetAvailableProducts();
      if (productsResponse.statusOk) {
        setProducts(productsResponse.payload);
      }

      // Fetch locations
      const locationsResponse = await apiGetDestinationLocations();
      if (locationsResponse.statusOk) {
        setLocations(locationsResponse.payload);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.product_id) {
      newErrors.product_id = "Product is required";
    }

    if (!formData.dest_location_id) {
      newErrors.dest_location_id = "Destination location is required";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.scheduled_date) {
      newErrors.scheduled_date = "Scheduled date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleProductSelect = (productId) => {
    const selectedProduct = products.find(
      (p) => p.product_id.toString() === productId
    );
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product_id: productId,
        uom_id: selectedProduct.uom_ids[0]?.id?.toString() || "",
        lot_id: selectedProduct.lots[0]?.id?.toString() || "",
      }));

      // Clear product-related errors
      setErrors((prev) => ({
        ...prev,
        product_id: null,
      }));
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // Keep open on iOS, close on Android

    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleInputChange("scheduled_date", formattedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDropdownFocus = (field, isFocus) => {
    setDropdownFocus(prev => ({
      ...prev,
      [field]: isFocus
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const transferData = {
        dest_location_id: parseInt(formData.dest_location_id),
        scheduled_date: formData.scheduled_date,
        products: [
          {
            product_id: parseInt(formData.product_id),
            uom_id: parseInt(formData.uom_id),
            quantity: parseFloat(formData.quantity),
            lot_id: parseInt(formData.lot_id),
          },
        ],
      };

      const response = await apiCreateInternalTransfer(transferData);

      console.log("response-->", response);

      if (response.statusOk) {
        toast.show("Internal transfer created", {
          type: "Success",
          // placement: "top",
        });
        onTransferCreated?.(); // Refresh the parent list
        onClose();
      } else {
        toast.show(response.message || "Failed to create transfer", {
          type: "error",
        });
      }
    } catch (error) {
      toast.show(error.response?.data?.message || "Failed to create transfer", {
        type: "error",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products.find(
    (p) => p.product_id.toString() === formData.product_id
  );
  const selectedLocation = locations.find(
    (l) => l.id.toString() === formData.dest_location_id
  );

  if (loading && products.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#001C4F" />
        <Text className="mt-4">Loading data...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-lg font-medium">Creation</Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="p-1"
            disabled={loading}
          >
            <CloseIcon />
          </TouchableOpacity>
        </View>

        <FormGroup label="To*">
        <Dropdown
          style={[
            styles.dropdown,
            {
              borderColor: errors.dest_location_id 
                ? "#FF0000" 
                : dropdownFocus.dest_location_id 
                  ? "#001C4F" 
                  : "#EFEFEF",
              backgroundColor: "#F8F9FC",
            }
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={locations.map((location) => ({
            label: location.name,
            value: location.id.toString(),
          }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Destination"
          searchPlaceholder="Search location..."
          value={formData.dest_location_id}
          onFocus={() => handleDropdownFocus("dest_location_id", true)}
          onBlur={() => handleDropdownFocus("dest_location_id", false)}
          onChange={item => {
            handleInputChange("dest_location_id", item.value);
          }}
          renderLeftIcon={() => null}
          disable={loading}
        />
        {errors.dest_location_id && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.dest_location_id}
          </Text>
        )}
      </FormGroup>

      <FormGroup label="Product Name*">
        <Dropdown
          style={[
            styles.dropdown,
            {
              borderColor: errors.product_id 
                ? "#FF0000" 
                : dropdownFocus.product_id 
                  ? "#001C4F" 
                  : "#EFEFEF",
              backgroundColor: "#F8F9FC",
            }
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={products.map((product) => ({
            label: product.product_name,
            value: product.product_id.toString(),
          }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Product"
          searchPlaceholder="Search product..."
          value={formData.product_id}
          onFocus={() => handleDropdownFocus("product_id", true)}
          onBlur={() => handleDropdownFocus("product_id", false)}
          onChange={item => {
            handleProductSelect(item.value);
          }}
          renderLeftIcon={() => null}
          disable={loading}
        />
        {errors.product_id && (
          <Text className="text-red-500 text-xs mt-1">{errors.product_id}</Text>
        )}
      </FormGroup>

      {selectedProduct && (
        <>
          <FormGroup label="UOM">
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderColor: dropdownFocus.uom_id ? "#001C4F" : "#EFEFEF",
                  backgroundColor: "#F8F9FC",
                }
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={selectedProduct.uom_ids.map((uom) => ({
                label: uom.name,
                value: uom.id.toString(),
              }))}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select UOM"
              value={formData.uom_id}
              onFocus={() => handleDropdownFocus("uom_id", true)}
              onBlur={() => handleDropdownFocus("uom_id", false)}
              onChange={item => {
                handleInputChange("uom_id", item.value);
              }}
              renderLeftIcon={() => null}
              disable={loading}
            />
          </FormGroup>

          <FormGroup label="Batch No">
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderColor: dropdownFocus.lot_id ? "#001C4F" : "#EFEFEF",
                  backgroundColor: "#F8F9FC",
                }
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={selectedProduct.lots.map((lot) => ({
                label: `${lot.name} (Qty: ${lot.on_hand})`,
                value: lot.id.toString(),
              }))}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Lot"
              value={formData.lot_id}
              onFocus={() => handleDropdownFocus("lot_id", true)}
              onBlur={() => handleDropdownFocus("lot_id", false)}
              onChange={item => {
                handleInputChange("lot_id", item.value);
              }}
              renderLeftIcon={() => null}
              disable={loading}
            />
          </FormGroup>
        </>
      )}

      <FormGroup label="Quantity*">
        <TextInput
          className={`border ${
            errors.quantity ? "border-red-500" : "border-[#EFEFEF]"
          } bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900`}
          placeholder="Enter Quantity"
          keyboardType="numeric"
          value={formData.quantity}
          onChangeText={(value) => handleInputChange("quantity", value)}
          editable={!loading}
        />
        {errors.quantity && (
          <Text className="text-red-500 text-xs mt-1">{errors.quantity}</Text>
        )}
      </FormGroup>

      <FormGroup label="Scheduled Date">
        <TouchableOpacity onPress={showDatepicker} disabled={loading}>
          <TextInput
            className={`border ${
              errors.scheduled_date ? "border-red-500" : "border-[#EFEFEF]"
            } bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900`}
            placeholder="YYYY-MM-DD"
            value={formData.scheduled_date}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        {errors.scheduled_date && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.scheduled_date}
          </Text>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={new Date(formData.scheduled_date)}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
      </FormGroup>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-[#144D4D] py-3 rounded-md mt-4 mb-6"
        disabled={loading}
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-medium">Transfer</Text>
        )}
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#111827',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 4,
  },
});

export default CreateForm;