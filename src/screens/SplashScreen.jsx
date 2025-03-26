import React, { useEffect } from "react";
import { View, Dimensions, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginImage from "../assets/images/login.png"

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      const userType = await AsyncStorage.getItem("user_type");
      navigation.replace(token ? "Tabs" : "Login", { userType: userType }); // Redirect based on auth state
    };

    // setTimeout(checkAuth, 2000); // Simulate a loading delay
  }, []);

  return (
    <View className="flex-1 justify-center items-end bg-[#144D4D]">
      <Image source={loginImage} style={{
          width: width, // Set full screen width
          height: height, // Set full screen height
          resizeMode: "cover", // Ensures image fully covers the screen
        }}/>
      {/* <LoginImage /> */}
    </View>
  );
};

export default SplashScreen;
