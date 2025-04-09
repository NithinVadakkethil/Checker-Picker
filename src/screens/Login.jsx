import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/icons/LoginLogo.svg";
import EyeOpen from "../assets/icons/eyeopen.svg";
import EyeClose from "../assets/icons/eyehide.svg";
import { loginUser } from "../api/AuthService";
import { useToast } from "react-native-toast-notifications";
import gradient from "../assets/images/gradient.png";

const Login = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const toast = useToast();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setCredentials((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleLogin = async () => {
    toast.hideAll();
    if (!credentials?.username.trim() || !credentials?.password.trim()) {
      toast.show("Username and Password are required!", {
        type: "danger",
      });
      return;
    }

    setIsLoading(true);
    const result = await loginUser(
      credentials?.username,
      credentials?.password
    );
    setIsLoading(false);
    toast.hideAll();
    if (result?.success) {
      toast.show("Login Success", {
        type: "Success",
        // placement: "top",
      });

      setTimeout(() => {
        navigation.replace("Tabs", { userType: result.userType });
      }, 1500);
    } else {
      toast.show(result.message, {
        type: "error",
      });
    }
  };

  return (
    <View className="flex-1 relative bg-white items-center justify-center px-8 w-full">
      <Image
        source={gradient}
        style={{
          height: height,
          width: width,
          resizeMode: "cover",
          position: "absolute",
        }}
      />
      <Logo width={170} height={150} />
      <View className="w-full pt-10">
        <Text className="text-sm font-bold text-black mb-1">Username</Text>
        <TextInput
          className="w-full bg-gray-100 p-3 rounded-sm text-gray-500"
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={credentials.username} // Controlled input
          onChangeText={(text) => handleChange("username", text)}
        />

        <Text className="text-sm font-bold text-black mt-5 mb-1">Password</Text>
        <View className="relative">
          <TextInput
            className="w-full bg-gray-100 p-3 rounded-sm text-gray-500 pr-10"
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!isPasswordVisible}
            value={credentials.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-3 top-3"
          >
            {isPasswordVisible ? (
              <EyeClose width={16} height={16} />
            ) : (
              <EyeOpen width={16} height={16} />
            )}
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="w-full bg-teal-900 p-3 rounded-md mt-10"
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-center text-lg">Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
