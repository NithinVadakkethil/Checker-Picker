import axiosInstance from "./axiosInstance";

export const apiGet = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    console.log("API Response:", response.data);
    return response.data; // Ensure you return only `data`
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || { message: "Error fetching data" };
  }
};
