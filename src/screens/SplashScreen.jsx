import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      const userType = await AsyncStorage.getItem("user_type");
      navigation.replace(token ? "Tabs" : "Login", { userType: userType }); // Redirect based on auth state
    };

    setTimeout(checkAuth, 2000); // Simulate a loading delay
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold mb-4">Welcome to My App</Text>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default SplashScreen;
