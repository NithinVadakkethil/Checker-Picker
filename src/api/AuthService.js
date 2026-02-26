import axiosInstance from "../utils/axiosInstance"; // Import your axios setup
import AsyncStorage from "@react-native-async-storage/async-storage";
import { convertToLowerCase } from "../utils/common";

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    const data = response?.data;

    if (!data?.statusOk) {
      return { success: false, message: data?.message || "Login failed" };
    }

    const accessToken = data?.payload?.token;
    const refreshToken = data?.payload?.refresh_token;
    const userType = convertToLowerCase(data?.payload?.user_type);

    if (!accessToken || !refreshToken) {
      console.error("Token missing in response", data);
      return { success: false, message: "Invalid login response" };
    }

    await AsyncStorage.setItem("token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);
    await AsyncStorage.setItem("user_type", userType);

    return { success: true, userType };
  } catch (error) {
    console.error(
      "Login Error 👉",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};
