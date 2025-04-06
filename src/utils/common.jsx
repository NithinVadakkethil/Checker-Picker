// utils/getTimeAgo.js
import { formatDistanceToNow, parse } from 'date-fns';

export const getTimeAgo = (dateString) => {
  if (!dateString) return "";

  const parsedDate = parse(dateString, 'dd/MM/yyyy HH:mm:ss', new Date());
  return formatDistanceToNow(parsedDate, { addSuffix: true }); // e.g., "6 minutes ago"
};

export const convertToLowerCase = (word) => {
    return /[A-Z]/.test(word) ? word.toLowerCase() : word;
  };