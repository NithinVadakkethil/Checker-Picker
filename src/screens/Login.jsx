import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/icons/LoginLogo.svg";
import { loginUser } from "../api/AuthService";
import { useToast } from "react-native-toast-notifications";

const Login = () => {
  const navigation = useNavigation();
  const toast = useToast();
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

  const handleLogin = async () => {
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
    <View className="flex-1 pt-40 bg-white items-center">
      {/* Top Gradient Background */}

      {/* Input Fields */}
      <View className="px-8 w-full items-center pt-10">
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

          <Text className="text-sm font-bold text-black mt-5 mb-1">
            Password
          </Text>
          <TextInput
            className="w-full bg-gray-100 p-3 rounded-sm text-gray-500"
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={credentials.password} // Controlled input
            onChangeText={(text) => handleChange("password", text)}
          />

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
    </View>
  );
};

export default Login;
