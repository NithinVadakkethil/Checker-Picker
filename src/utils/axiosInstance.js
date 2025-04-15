import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "https://fifi.zinfog.in",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get token from AsyncStorage
const getToken = () => {
  return AsyncStorage.getItem("token").then(token => token);
};

// 🚀 Request Interceptor: Add Authorization Token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚀 Response Interceptor: Handle Token Expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Token might be expired.");
      
      // 🔴 Remove token & log out the user
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refresh_token");

      // 🚀 Optionally, redirect to Login Screen (use navigation if available)
      navigation.navigate("Login");

      return Promise.reject("Session expired. Please log in again.");
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// const axiosInstance = axios.create({
//   baseURL: "https://fifi.zinfog.in",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to get token from AsyncStorage
// const getToken = () => AsyncStorage.getItem("token");
// const getRefreshToken = () => AsyncStorage.getItem("refresh_token");

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// // 🚀 Request Interceptor: Add Authorization Token
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = await getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🚀 Response Interceptor: Refresh Access Token Logic
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = "Bearer " + token;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         const refresh_token = await getRefreshToken();

//         const response = await axios.post("https://fifi.zinfog.in/auth/refresh", {
//           refresh_token,
//         });

//         const newAccessToken = response.data.payload.token.access_token;
//         const newRefreshToken = response.data.payload.token.refresh_token;

//         // Save new tokens
//         await AsyncStorage.setItem("token", newAccessToken);
//         await AsyncStorage.setItem("refresh_token", newRefreshToken);

//         axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
//         originalRequest.headers.Authorization = "Bearer " + newAccessToken;

//         processQueue(null, newAccessToken);
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         processQueue(err, null);

//         await AsyncStorage.removeItem("token");
//         await AsyncStorage.removeItem("refresh_token");

//         // Optionally redirect to login
//         navigation.navigate("Login");

//         return Promise.reject("Session expired. Please log in again.");
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
