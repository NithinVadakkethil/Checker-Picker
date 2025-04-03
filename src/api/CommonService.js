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
