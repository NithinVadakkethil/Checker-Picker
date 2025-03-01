import React, { useState } from 'react';
import TableComponent from './TableComponent';

const StockTable = () => {
  const [tableHead] = useState(['Product Name', 'Current Stock', 'Actual Field', 'Balance']);
  const [widthArr] = useState([150, 110, 100, 75]);
  const [tableData] = useState([
    ['Dairy Milk', '1500', '500', '1000'],
    ['Dairy Milk', '1500', '500', '1000'],
    ['Dairy Milk', '1500', '500', '1000'],
    ['Dairy Milk', '1500', '500', '1000'],
    ['Dairy Milk', '1500', '500', '1000']
  ]);

  return <TableComponent tableHead={tableHead} widthArr={widthArr} tableData={tableData} />;
};

export default StockTable;
