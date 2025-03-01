/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: [
          "Poppins-Regular",
          "Poppins-Medium",
          "Poppins-SemiBold",
          "Poppins-Bold",
        ],
        inter: [
          "Inter-Regular",
          "Inter-Bold",
          "Inter-ExtraBold",
          "Inter-Medium",
          "Inter-SemiBold",
          "Inter-Light",
        ],
      },
    },
  },
  plugins: [],
};
