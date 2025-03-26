import { View, FlatList, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { TransferItem, CreateBottomSheet } from "../../components";
import Add from "../../assets/icons/Add.svg";

const ZoneTransfer = ({ navigation, onPress }) => {
  const createBottomSheetRef = useRef(null);
  const transferItems = [
    {
      id: 1,
      status: "Completed",
      fromZone: "Zone A1",
      fromColor: "#2F80ED",
      toZone: "Zone B1",
      toColor: "#EB5B00",
      imageUri:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/09cd1b02dd637dcb8de157bb25ec89c157084cb6e51c4305c4d869d3697c7e20",
    },
    {
      id: 2,
      status: "Completed",
      fromZone: "Zone A1",
      fromColor: "#2F80ED",
      toZone: "Zone C",
      toColor: "#FFB200",
      imageUri:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b7a271550450fe7e3c0c7dfba49016a109166026f4ab5c5d034da807001c529d",
    },
    {
      id: 3,
      status: "Reassign",
      fromZone: "Zone A1",
      fromColor: "#2F80ED",
      toZone: "Zone D1",
      toColor: "#DE64AC",
      imageUri:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b138c1b026bf46724a9740ec40de6c62f008f13ce869a8deb7817a63fc702932",
    },
    {
      id: 4,
      status: "Reassign",
      fromZone: "Picking Area",
      fromColor: "#2F80ED",
      toZone: "Sales Return",
      toColor: "#DB0DDF",
      imageUri:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/98c95ed96eed9d74e6e9823fa7558876716100a73fce4939928b20e260b9ef5e",
    },
    {
      id: 5,
      status: "Reassign",
      fromZone: "Zone A1",
      fromColor: "#2F80ED",
      toZone: "Damage",
      toColor: "#FF2020",
      imageUri:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/30aae5a562124ac772a9eaef056d4ff53faf64d282de813d7d215768164ef9d9",
    },
  ];

  const createSheetClose = () => {
    createBottomSheetRef.current.close();
  };

  const createSheetOpen = () => {
    createBottomSheetRef.current.open();
  };

  return (
    <View className="flex-1">
      <FlatList
        data={transferItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress("", "Zone Transfer")}>
            <TransferItem
              status={item.status}
              fromZone={item.fromZone}
              fromColor={item.fromColor}
              toZone={item.toZone}
              toColor={item.toColor}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <TouchableOpacity
        onPress={createSheetOpen}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <Add />
      </TouchableOpacity>
      <CreateBottomSheet
        onClose={createSheetClose}
        onOpen={createSheetOpen}
        bottomSheetRef={createBottomSheetRef}
      />
    </View>
  );
};

export default ZoneTransfer;
