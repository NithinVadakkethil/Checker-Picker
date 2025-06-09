import React, { useState } from "react";
import { Dimensions } from "react-native";
import TableComponent from "./TableComponent";

const StockTable = ({ tableData, onUpdateQuantity }) => {
  const screenWidth = Dimensions.get("window").width;

  // Determine if we need to show actual qty columns
  const hasActualQtyItems = tableData.some((item) => item.show_actual_qty);

  // Adjust column widths based on whether actual qty columns are shown
  const columnWidths = hasActualQtyItems
    ? [0.4, 0.2, 0.2, 0.2] // All 4 columns
    : [0.6, 0.4]; // Only product name and current stock

  const widthArr = columnWidths.map((width) => screenWidth * width);

  const [tableHead] = useState(
    hasActualQtyItems
      ? ["Product Name", "Current Stock", "Actual Field", "Balance"]
      : ["Product Name", "Current Stock"]
  );

  return (
    <TableComponent
      tableHead={tableHead}
      widthArr={widthArr}
      tableData={tableData}
      onUpdateQuantity={onUpdateQuantity}
      showActualQty={hasActualQtyItems}
    />
  );
};

export default StockTable;
