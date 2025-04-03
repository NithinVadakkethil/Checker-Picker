import React, { useState } from "react";
import { Dimensions } from "react-native";
import TableComponent from "./TableComponent";

const StockTable = ({ tableData }) => {
  const screenWidth = Dimensions.get("window").width; // Get the screen width
  const columnWidths = [0.4, 0.2, 0.2, 0.2]; // Column width percentages (adjust as needed)
  const widthArr = columnWidths.map((width) => screenWidth * width); // Calculate column widths dynamically

  const [tableHead] = useState([
    "Product Name",
    "Current Stock",
    "Actual Field",
    "Balance",
  ]);

  return (
    <TableComponent
      tableHead={tableHead}
      widthArr={widthArr}
      tableData={tableData}
    />
  );
};

export default StockTable;
