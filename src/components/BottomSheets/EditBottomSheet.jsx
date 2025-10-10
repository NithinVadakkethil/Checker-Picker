import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import EditForm from "../Form/EditForm";
import dayjs from "dayjs";
import CloseIcon from "../../assets/icons/Close.svg";
import LeftIcon from "../../assets/icons/left.svg";
import RightIcon from "../../assets/icons/right.svg";

const EditBottomSheet = ({ bottomSheetRef, onClose, selectedDate, setSelectedDate, pickerDateUpdate, activeMoveId }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayIndex = currentMonth.startOf("month").day();

  const datesArray = Array.from(
    { length: firstDayIndex + daysInMonth },
    (_, i) => {
      return i < firstDayIndex
        ? null
        : currentMonth.date(i - firstDayIndex + 1);
    }
  );

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  // const renderDateCell = (date, index) => {
  //   if (!date) {
  //     return <View key={index} className="w-[14.28%] h-10 my-1" />;
  //   }
  
  //   const isToday = dayjs().isSame(date, "day");
  //   const isSelected =
  //     date?.format("YYYY-MM-DD") === selectedDate?.format("YYYY-MM-DD");
  
  //   let bgColor = "";
  //   let textColor = "text-black";
  
  //   if (isToday) {
  //     bgColor = "bg-yellow-300"; // Color for today's date
  //     textColor = "text-black font-bold";
  //   }
  
  //   if (isSelected) {
  //     bgColor = "bg-teal-800"; // Override if selected
  //     textColor = "text-white font-semibold";
  //   }
  
  //   return (
  //     <TouchableOpacity
  //       key={index}
  //       className={`w-[14.28%] h-10 justify-center items-center my-1 ${bgColor} rounded-full`}
  //       onPress={() => setSelectedDate(date)}
  //     >
  //       <Text className={`text-sm ${textColor}`}>
  //         {date?.format("DD")}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  const renderDateCell = (date, index) => {
    if (!date) {
      return <View key={index} className="w-[14.28%] h-10 my-1" />;
    }
  
    const isToday = dayjs().isSame(date, "day");
    const isSelected = date?.format("YYYY-MM-DD") === selectedDate;
  
    let bgColor = "";
    let textColor = "text-black";
  
    if (isToday) {
      bgColor = "bg-yellow-300";
      textColor = "text-black font-bold";
    }
  
    if (isSelected) {
      bgColor = "bg-teal-800";
      textColor = "text-white font-semibold";
    }
  
    return (
      <TouchableOpacity
        key={index}
        className={`w-[14.28%] h-10 justify-center items-center my-1 ${bgColor} rounded-full`}
        onPress={() => setSelectedDate(date.format("YYYY-MM-DD"))}
      >
        <Text className={`text-sm ${textColor}`}>
          {date?.format("DD")}
        </Text>
      </TouchableOpacity>
    );
  };  

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Bottom Sheet Component */}
      <RBSheet
        ref={bottomSheetRef} // Attach the reference
        height={450} // Set the height of the bottom sheet
        closeOnDragDown={true} // Allow closing by dragging down
        animationType="slide" // Use slide animation
        closeOnPressMask={true}
        customModalProps={{
          statusBarTranslucent: true,
        }}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          },
        }}
      >
        {/* Pass the onClose function to EditForm */}
        <View className="bg-white rounded-t-2xl p-4 pt-0">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-lg font-semibold">Calendar</Text>
            <TouchableOpacity onPress={onClose}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          {/* Month Navigation */}
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-medium">
              {currentMonth?.format("MMMM YYYY")}
            </Text>
            <View className="flex-row items-center gap-5">
              <TouchableOpacity onPress={handlePrevMonth}>
                <LeftIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth}>
                <RightIcon />
              </TouchableOpacity>
            </View>
          </View>

          {/* Weekdays */}
          <View className="flex-row justify-between">
            {weekDays.map((day, idx) => (
              <Text
                key={idx}
                className="flex-1 text-center font-bold text-gray-600"
              >
                {day}
              </Text>
            ))}
          </View>

          {/* Dates Grid */}
          <View className="flex-row flex-wrap mt-1">
            {datesArray.map((date, idx) => renderDateCell(date, idx))}
          </View>

          {/* Save Button */}
          <TouchableOpacity
             onPress={() => pickerDateUpdate(activeMoveId, selectedDate)}
            className="bg-teal-800 p-3 rounded-lg mt-4"
          >
            <Text className="text-white text-center font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default EditBottomSheet;
