import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { useListCount } from "../context/ListCountContext";
import Logo from "../assets/icons/logo.svg";
import Logout from "../assets/icons/logout.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native"; // install this if you haven't
import CheckmarkAnim from "../assets/animations/checkmark.json"; // import your Lottie animation

const Header = () => {
  const navigation = useNavigation();
  const toast = useToast()
  const { setListCounts } = useListCount();
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success"

  const handleLogout = async () => {
    toast.hideAll()
    setStatus("loading");
    try {
      await AsyncStorage.removeItem("token");
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => {
          setListCounts({
            saleInvoice: 0,
            zoneTransfer: 0,
            scheduledDelivery: 0,
            checkerSaleInvoice: 0,
            checkerZoneTransfer: 0,
            checkerScheduledDelivery: 0
          })
          navigation.replace("Login");
        }, 1000); // wait after checkmark before navigating
      }, 1000); // simulate API delay
    } catch (error) {
      console.error("Logout Error:", error);
      setStatus("idle");
    }
  };

  const hide = ()=> {
    toast.hideAll()
  }

  const handleExitPress = () => {
    toast.hideAll()
    toast.show("", {
      type: "logout",
      duration: 0,
      offset: 160,
      handleLogout: handleLogout,
      hide: hide 
    });
  }

  const renderLogoutContent = () => {
    if (status === "loading") {
      return <ActivityIndicator size="small" color="#000" />;
    }

    if (status === "success") {
      return (
        <LottieView
          source={CheckmarkAnim}
          autoPlay
          loop={false}
          style={{ width: 30, height: 30 }}
        />
      );
    }

    return <Logout />;
  };

  return (
    <View
      className="flex-row items-center justify-between px-7 py-4 bg-white"
      style={{
        shadowColor: "rgba(1, 1, 0, 0.16)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Logo width={75} height={31} />
      <TouchableOpacity onPress={handleExitPress} disabled={status !== "idle"}>
        {renderLogoutContent()}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
