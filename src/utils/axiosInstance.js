import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "https://fifi.zinfog.in",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get token from AsyncStorage
const getToken = () => {
  return AsyncStorage.getItem("token").then(token => token);
};

// 🚀 Request Interceptor: Add Authorization Token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚀 Response Interceptor: Handle Token Expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Token might be expired.");
      
      // 🔴 Remove token & log out the user
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refresh_token");

      // 🚀 Optionally, redirect to Login Screen (use navigation if available)
      // navigation.navigate("Login");

      return Promise.reject("Session expired. Please log in again.");
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
