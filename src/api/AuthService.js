import axiosInstance from "../utils/axiosInstance"; // Import your axios setup
import AsyncStorage from "@react-native-async-storage/async-storage";
import { convertToLowerCase } from "../utils/common";

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    if (response?.data?.statusOk) {
      const { access_token, refresh_token } = response?.data?.payload?.token;
      const userType = convertToLowerCase(response?.data?.payload?.user_type)

      // Store tokens in AsyncStorage
      await AsyncStorage.setItem("token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);
      await AsyncStorage.setItem("user_type", userType);

      return { success: true, userType: userType }; // Return user data
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};
