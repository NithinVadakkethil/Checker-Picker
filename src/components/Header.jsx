import { TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/icons/logo.svg";
import Logout from "../assets/icons/logout.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Clear token
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return (
    <View
      className="flex-row items-center justify-between px-7 py-4 bg-white"
      style={{
        shadowColor: "rgba(1, 1, 0, 0.16)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2, // Required for Android
      }}
    >
      <Logo width={75} height={31} />
      <TouchableOpacity onPress={handleLogout}>
        <Logout />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
