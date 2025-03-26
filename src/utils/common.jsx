export const convertToLowerCase = (word) => {
    return /[A-Z]/.test(word) ? word.toLowerCase() : word;
  };