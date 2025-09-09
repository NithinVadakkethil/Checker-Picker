import axiosInstance from "../utils/axiosInstance";
export const updatePickerStatus = async (id) => {
  try {
    const response = await axiosInstance.patch(
      `/picker/update_product_pick_status/${id}`
    );
    console.log("Update Success:", response.data);
    if (response?.data?.statusOk) {
      return { success: true, message: response?.data?.message };
    }
  } catch (error) {
    console.error("Update Failed:", error);
    console.error(
      "Status Update Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Updation failed",
    };
  }
};

export const checkerReAssign = async (id, note, quantity) => {
  try {
    const response = await axiosInstance.patch(`/checker/reassign/${id}`, {
      note, // Passing note in the request body
      quantity
    });

    console.log("Update Success:", response.data);
    if (response?.data?.statusOk) {
      return { success: true, message: response?.data?.message };
    }
  } catch (error) {
    console.error("Update Failed:", error);
    console.error(
      "Status Update Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Updation failed",
    };
  }
};

export const checkerVerify = async (moveId) => {
  try {
    const response = await axiosInstance.patch(`/checker/update_product_verify_status/${moveId}`);

    console.log("Update Success:", response.data);
    if (response?.data?.statusOk) {
      return { success: true, message: response?.data?.message };
    }
  } catch (error) {
    console.error("Update Failed:", error);
    console.error(
      "Status Update Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Updation failed",
    };
  }
};

export const checkerSaleOrderVerify = async (saleId) => {
  try {
    const response = await axiosInstance.patch(`/checker/verify_sale_picking/${saleId}`);

    console.log("Update Success:", response.data);
    if (response?.data?.statusOk) {
      return { success: true, message: response?.data?.message };
    }
  } catch (error) {
    console.error("Update Failed:", error);
    console.error(
      "Status Update Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Updation failed",
    };
  }
};

export const checkerZoneTransferVerify = async (saleId) => {
  try {
    const response = await axiosInstance.patch(`/checker/verify_picking/${saleId}`);

    console.log("Update zone Success:", response.data);
    if (response?.data?.statusOk) {
      return { success: true, message: response?.data?.message };
    }
  } catch (error) {
    console.error("Update Failed:", error);
    console.error(
      "Status Update Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Updation failed",
    };
  }
};

export const updateCurrentStock = async (id, quantity) => {
  console.log("id--->", id)
  try {
    const response = await axiosInstance.patch(`/picker/update_quantity/${id}`, {
      quantity
    });

    console.log("Update Success:", response.data);
    if (response?.data?.statusOk) {
      return { success: true, message: response?.data?.message };
    }
  } catch (error) {
    console.error("Update Failed:", error);
    console.error(
      "Status Update Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Updation failed",
    };
  }
};

export const updatePickerDate = async (id , date) => {
  try {
    const response = await axiosInstance.patch(
      `/picker/update_product_pick_status/${id}`, date
    );
    console.log("Update Success:", response.data);
    if (response?.data?.statusOk) {
      return { success: true, message: response?.data?.message };
    }
  } catch (error) {
    console.error("Update Failed:", error);
    console.error(
      "Status Update Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Updation failed",
    };
  }
};

export const updatecheckerDate = async (id , date) => {
  try {
    const response = await axiosInstance.patch(
      `/checker/verify_sale_picking/${id}`, date
    );
    console.log("Update Success:", response.data);
    if (response?.data?.statusOk) {
      return { success: true, message: response?.data?.message };
    }
  } catch (error) {
    console.error("Update Failed:", error);
    console.error(
      "Status Update Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Updation failed",
    };
  }
};

// Add to your apiService.js file
export const apiGetAvailableProducts = async () => {
  try {
    const response = await axiosInstance.get('/picker/available_products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch available products:', error);
    throw error;
  }
};

export const apiGetDestinationLocations = async () => {
  try {
    const response = await axiosInstance.get('/picker/destination_locations');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch destination locations:', error);
    throw error;
  }
};

export const apiCreateInternalTransfer = async (transferData) => {
  try {
    const response = await axiosInstance.post('/picker/create_internal_transfer', transferData);
    return response.data;
  } catch (error) {
    console.error('Failed to create internal transfer:', error);
    throw error;
  }
};
