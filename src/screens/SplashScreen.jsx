import React, { useEffect } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "@react-native-community/blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import loginImage from "../assets/images/login.png";
import Logo from "../assets/icons/logoicon.svg";
import LogoText from "../assets/icons/logotext.svg";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotation = useSharedValue(-360);
  const translateX = useSharedValue(0);
  const logoTextOpacity = useSharedValue(0);
  const logoTextScale = useSharedValue(0.8); // Start smaller

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      const userType = await AsyncStorage.getItem("user_type");
      navigation.replace(token ? "Tabs" : "Login", { userType: userType });
    };
    setTimeout(checkAuth, 2000);
    // Initial animations (opacity, scale, rotation)
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    rotation.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });

    // Move logo left & fade in LogoText
    setTimeout(() => {
      translateX.value = withTiming(-width / 22, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      });

      logoTextOpacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
      logoTextScale.value = withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
    }, 1200);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
      { translateX: translateX.value }, // Moves left after animation
    ],
  }));

  const logoTextAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoTextOpacity.value,
    transform: [{ scale: logoTextScale.value }], // Slight scale-up effect
  }));

  return (
    <View className="flex-1 relative items-center justify-center bg-[#144D4D]">
      <Image
        source={loginImage}
        style={{
          height: height,
          width: width,
          resizeMode: "cover",
          position: "absolute",
        }}
      />
      {/* <BlurView
        style={styles.blurOverlay}
        blurType="light"
        blurAmount={0}
        reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.1)"
      /> */}

      <View className="flex-row items-center">
        {/* Animated Logo */}
        <Animated.View style={logoAnimatedStyle}>
          <Logo width={65} height={65} />
        </Animated.View>

        {/* Animated Logo Text */}
        <Animated.View style={logoTextAnimatedStyle}>
          <LogoText width={85} height={85} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default SplashScreen;
