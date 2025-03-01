import { View } from "react-native";
import React from "react";
import Logo from "../assets/icons/logo.svg";

const Header = () => {
  return (
    <View
      className="flex-row items-center px-7 py-4 bg-white"
      style={{
        shadowColor: "rgba(1, 1, 0, 0.16)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2, // Required for Android
      }}
    >
      <Logo width={75} height={31} />
    </View>
  );
};

export default Header;
