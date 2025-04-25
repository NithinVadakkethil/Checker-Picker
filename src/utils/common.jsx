// utils/getTimeAgo.js
import { formatDistanceToNow, parse } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTimeAgo = (dateString) => {
  if (!dateString) return "";

  const parsedDate = parse(dateString, 'dd/MM/yyyy HH:mm:ss', new Date());
  return formatDistanceToNow(parsedDate, { addSuffix: true }); // e.g., "6 minutes ago"
};

export const convertToLowerCase = (word) => {
    return /[A-Z]/.test(word) ? word.toLowerCase() : word;
  };

// -------------------------
// STOCK STORAGE UTILITIES
// -------------------------
const STOCK_KEY = "updated_stock_values";

// Save updated stock
export const saveStockToStorage = async (id, stock) => {
  try {
    const jsonValue = await AsyncStorage.getItem(STOCK_KEY);
    const existing = jsonValue != null ? JSON.parse(jsonValue) : {};
    existing[id] = stock;
    await AsyncStorage.setItem(STOCK_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error("Error saving stock", e);
  }
};

// Get saved stock values
export const getSavedStockValues = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STOCK_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error("Error reading stock", e);
    return {};
  }
};