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

// import axiosInstance from "./axiosInstance";

// export const apiGet = async (endpoint, params = {}) => {
//   try {
//     const response = await axiosInstance.get(endpoint, { params });
//     return response.data; // Keep only what's needed
//   } catch (error) {
//     console.error("API Error:", error.response?.data || error.message);

//     // Optionally, rethrow a normalized error object
//     throw {
//       success: false,
//       message: error.response?.data?.message || "Error fetching data",
//       status: error.response?.status || 500,
//     };
//   }
// };
