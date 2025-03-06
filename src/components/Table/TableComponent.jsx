// import React from "react";
// import { ScrollView, View } from "react-native";
// import { Table, Row } from "react-native-table-component";

// const TableComponent = ({ tableHead, widthArr, tableData }) => {
//   return (
//     <View className="flex-1">
//       <ScrollView horizontal>
//         <View>
//           {/* Table Header */}
//           <Table>
//             <Row
//               data={tableHead}
//               widthArr={widthArr}
//               style={{backgroundColor: "#FFF", padding: 8 }}
//               textStyle={{ fontWeight: 500, color: "#252525", fontSize: 14 }}
//             />
//           </Table>

//           {/* Table Body */}
//           <ScrollView className="mt-[-1px]">
//             <Table>
//               {tableData.map((rowData, index) => (
//                 <Row
//                   key={index}
//                   data={rowData}
//                   widthArr={widthArr}
//                   style={[
//                     { height: 45 },
//                     {
//                       borderBottomWidth: index === tableData.length - 1 ? 0 : 1,
//                       borderBottomColor: "#CBCBCB",
//                     },
//                   ]}
//                   textStyle={{
//                     paddingLeft: 8,
//                     textAlign: 'left',
//                     fontSize: 14,
//                     color: "#252525",
//                     fontWeight: 400
//                   }}
//                 />
//               ))}
//             </Table>
//           </ScrollView>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default TableComponent;

import React, { useState } from "react";
import { ScrollView, View, TextInput } from "react-native";
import { Table, Row } from "react-native-table-component";

const TableComponent = ({ tableHead, widthArr, tableData }) => {
  // Initialize state with "Current Stock" values
  const [stockValues, setStockValues] = useState(
    tableData.map(row => row[1]) // Assuming "Current Stock" is at index 1
  );

  // Handle input change
  const handleStockChange = (text, index) => {
    const updatedStock = [...stockValues];
    updatedStock[index] = text;
    setStockValues(updatedStock);
  };

  return (
    <View className="flex-1">
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <Table>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={{ backgroundColor: "#FFF", padding: 8 }}
              textStyle={{ fontWeight: "500", color: "#252525", fontSize: 14 }}
            />
          </Table>

          {/* Table Body */}
          <ScrollView className="mt-[-1px]">
            <Table>
              {tableData.map((rowData, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    height: 45,
                    alignItems: "center",
                    borderBottomWidth: index === tableData.length - 1 ? 0 : 1,
                    borderBottomColor: "#CBCBCB",
                  }}
                >
                  {/* Product Name */}
                  <View style={{ width: widthArr[0], paddingLeft: 8 }}>
                    <Row data={[rowData[0]]} textStyle={{ fontSize: 14, color: "#252525" }} />
                  </View>

                  {/* Current Stock - TextInput Field */}
                  <TextInput
                    style={{
                      width: widthArr[1],
                      height: 40,
                      paddingLeft: 8,
                      fontSize: 14,
                    }}
                    value={stockValues[index]}
                    onChangeText={(text) => handleStockChange(text, index)}
                    keyboardType="numeric"
                  />

                  {/* Actual Field */}
                  <View style={{ width: widthArr[2], paddingLeft: 8 }}>
                    <Row data={[rowData[2]]} textStyle={{ fontSize: 14, color: "#252525" }} />
                  </View>

                  {/* Balance */}
                  <View style={{ width: widthArr[3], paddingLeft: 8 }}>
                    <Row data={[rowData[3]]} textStyle={{ fontSize: 14, color: "#252525" }} />
                  </View>
                </View>
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default TableComponent;
