import React, { createContext, useContext, useState } from 'react';

const ListCountContext = createContext();

export const ListCountProvider = ({ children }) => {
  const [listCounts, setListCounts] = useState({
    saleInvoice: 0,
    zoneTransfer: 0,
    scheduledDelivery: 0,
    reciepts: 0,
    checkerSaleInvoice: 0,
    checkerZoneTransfer: 0,
    checkerScheduledDelivery: 0,
    checkerReciepts: 0
  });

  const updateListCount = (screenKey, count) => {
    setListCounts(prev => ({
      ...prev,
      [screenKey]: count,
    }));
  };

  return (
    <ListCountContext.Provider value={{ listCounts, updateListCount, setListCounts }}>
      {children}
    </ListCountContext.Provider>
  );
};

export const useListCount = () => useContext(ListCountContext);
