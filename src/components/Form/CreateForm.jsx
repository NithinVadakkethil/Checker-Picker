import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, ScrollView, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import FormGroup from "./FormGroup";
import CloseIcon from "../../assets/icons/Close.svg";
import { apiGetAvailableProducts, apiGetDestinationLocations, apiCreateInternalTransfer } from "../../api/CommonService";
// import DateTimePicker from '@react-native-community/datetimepicker';

const CreateForm = ({ onClose, onTransferCreated }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [formData, setFormData] = useState({
    product_id: "",
    uom_id: "",
    lot_id: "",
    quantity: "",
    dest_location_id: "",
    scheduled_date: new Date().toISOString().split('T')[0] // Default to today
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleProductSelect = (productId) => {
    const selectedProduct = products.find(p => p.product_id.toString() === productId);
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        product_id: productId,
        uom_id: selectedProduct.uom_ids[0]?.id?.toString() || "",
        lot_id: selectedProduct.lots[0]?.id?.toString() || ""
      }));
      
      // Clear product-related errors
      setErrors(prev => ({
        ...prev,
        product_id: null
      }));
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS, close on Android
    
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInputChange('scheduled_date', formattedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
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
        products: [{
          product_id: parseInt(formData.product_id),
          uom_id: parseInt(formData.uom_id),
          quantity: parseFloat(formData.quantity),
          lot_id: parseInt(formData.lot_id)
        }]
      };

      const response = await apiCreateInternalTransfer(transferData);

      console.log("response-->", response)
      
      if (response.statusOk) {
        Alert.alert("Success", "Transfer created successfully");
        onTransferCreated?.(); // Refresh the parent list
        onClose();
      } else {
        Alert.alert("Error", response.message || "Failed to create transfer");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to create transfer");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products.find(p => p.product_id.toString() === formData.product_id);
  const selectedLocation = locations.find(l => l.id.toString() === formData.dest_location_id);

  if (loading && products.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#001C4F" />
        <Text className="mt-4">Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-lg font-medium">Creation</Text>
        </View>
        <TouchableOpacity onPress={onClose} className="p-1" disabled={loading}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <FormGroup label="To*">
        <SelectList
          setSelected={(value) => handleInputChange('dest_location_id', value)}
          data={locations.map(location => ({
            key: location.id.toString(),
            value: location.name
          }))}
          save="key"
          placeholder="Select Destination"
          searchPlaceholder="Search location..."
          boxStyles={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: errors.dest_location_id ? "#FF0000" : "#EFEFEF",
            backgroundColor: "#F8F9FC",
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
          dropdownStyles={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#EFEFEF",
            backgroundColor: "#FFFFFF",
          }}
          disabled={loading}
        />
        {errors.dest_location_id && (
          <Text className="text-red-500 text-xs mt-1">{errors.dest_location_id}</Text>
        )}
      </FormGroup>

      <FormGroup label="Product Name*">
        <SelectList
          setSelected={(value) => handleProductSelect(value)}
          data={products.map(product => ({
            key: product.product_id.toString(),
            value: product.product_name
          }))}
          save="key"
          placeholder="Select Product"
          searchPlaceholder="Search product..."
          boxStyles={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: errors.product_id ? "#FF0000" : "#EFEFEF",
            backgroundColor: "#F8F9FC",
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
          dropdownStyles={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#EFEFEF",
            backgroundColor: "#FFFFFF",
          }}
          disabled={loading}
        />
        {errors.product_id && (
          <Text className="text-red-500 text-xs mt-1">{errors.product_id}</Text>
        )}
      </FormGroup>

      {selectedProduct && (
        <>
          <FormGroup label="UOM">
            <SelectList
              setSelected={(value) => handleInputChange('uom_id', value)}
              data={selectedProduct.uom_ids.map(uom => ({
                key: uom.id.toString(),
                value: uom.name
              }))}
              save="key"
              placeholder="Select UOM"
              defaultOption={{
                key: selectedProduct.uom_ids[0]?.id?.toString() || "",
                value: selectedProduct.uom_ids[0]?.name || "No UOM available"
              }}
              boxStyles={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#EFEFEF",
                backgroundColor: "#F8F9FC",
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              dropdownStyles={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#EFEFEF",
                backgroundColor: "#FFFFFF",
              }}
              disabled={loading}
            />
          </FormGroup>

          <FormGroup label="Lot">
            <SelectList
              setSelected={(value) => handleInputChange('lot_id', value)}
              data={selectedProduct.lots.map(lot => ({
                key: lot.id.toString(),
                value: `${lot.name} (Qty: ${lot.on_hand})`
              }))}
              save="key"
              placeholder="Select Lot"
              defaultOption={{
                key: selectedProduct.lots[0]?.id?.toString() || "",
                value: selectedProduct.lots[0]?.name || "No lots available"
              }}
              boxStyles={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#EFEFEF",
                backgroundColor: "#F8F9FC",
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              dropdownStyles={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#EFEFEF",
                backgroundColor: "#FFFFFF",
              }}
              disabled={loading}
            />
          </FormGroup>
        </>
      )}

      <FormGroup label="Quantity*">
        <TextInput
          className={`border ${errors.quantity ? "border-red-500" : "border-[#EFEFEF]"} bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900`}
          placeholder="Enter Quantity"
          keyboardType="numeric"
          value={formData.quantity}
          onChangeText={(value) => handleInputChange('quantity', value)}
          editable={!loading}
        />
        {errors.quantity && (
          <Text className="text-red-500 text-xs mt-1">{errors.quantity}</Text>
        )}
      </FormGroup>

      <FormGroup label="Scheduled Date">
        <TouchableOpacity onPress={showDatepicker} disabled={loading}>
          <TextInput
            className={`border ${errors.scheduled_date ? "border-red-500" : "border-[#EFEFEF]"} bg-[#F8F9FC] rounded-[4px] px-4 py-3 text-gray-900`}
            placeholder="YYYY-MM-DD"
            value={formData.scheduled_date}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        {errors.scheduled_date && (
          <Text className="text-red-500 text-xs mt-1">{errors.scheduled_date}</Text>
        )}
        
        {/* {showDatePicker && (
          <DateTimePicker
            value={new Date(formData.scheduled_date)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )} */}
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
  );
};

export default CreateForm;