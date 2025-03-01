import React from "react";
import { ScrollView, View } from "react-native";
import { Table, Row } from "react-native-table-component";
import { useNavigation } from "@react-navigation/native";

const TableComponent = ({ tableHead, widthArr, tableData }) => {
    const navigation = useNavigation();
  return (
    <View className="flex-1">
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <Table>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={{backgroundColor: "#FFF", padding: 8 }}
              textStyle={{ fontWeight: 500, color: "#252525", fontSize: 14 }}
            />
          </Table>

          {/* Table Body */}
          <ScrollView className="mt-[-1px]">
            <Table>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[
                    { height: 45 },
                    {
                      borderBottomWidth: index === tableData.length - 1 ? 0 : 1,
                      borderBottomColor: "#CBCBCB",
                    },
                  ]}
                  textStyle={{
                    paddingLeft: 8,
                    textAlign: 'left',
                    fontSize: 14,
                    color: "#252525",
                    fontWeight: 400
                  }}
                  onPress={() => navigation.navigate("History")}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default TableComponent;
