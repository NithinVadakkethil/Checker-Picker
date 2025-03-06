import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Logo from "../assets/icons/LoginLogo.svg";

const Login = () => {
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
        />

        <Text className="text-sm font-bold text-black mt-5 mb-1">Password</Text>
        <TextInput
          className="w-full bg-gray-100 p-3 rounded-sm text-gray-500"
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        {/* Login Button */}
        <TouchableOpacity className="w-full bg-teal-900 p-3 rounded-md mt-10">
          <Text className="text-white text-center text-lg">Login</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
