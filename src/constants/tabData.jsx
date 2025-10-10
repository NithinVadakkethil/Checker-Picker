import { useListCount } from "../context/ListCountContext";
import {
  SalesInvoice,
  ZoneTransfer,
  ScheduledDelivery,
  StockCountView,
  History,
  Receipts,
  CheckerSalesInvoice,
  CheckerZoneTransfer,
  CheckerScheduledDelivery,
  CheckerReciepts,
  CheckerHistory,
} from "../screens";

export const usePickersTabData = () => {
  const { listCounts } = useListCount();

  return [
    {
      id: 1,
      name: "Sales Invoice",
      count: listCounts.saleInvoice,
      component: SalesInvoice,
    },
    {
      id: 2,
      name: "Zone Transfer",
      count: listCounts.zoneTransfer,
      component: ZoneTransfer,
    },
    {
      id: 3,
      name: "Scheduled Delivery",
      count: listCounts.scheduledDelivery,
      component: ScheduledDelivery,
    },
    {
      id: 4,
      name: "Stock Count View",
      component: StockCountView,
    },
    {
      id: 5,
      name: "Receipts",
      count: listCounts.reciepts,
      component: Receipts,
    },
    {
      id: 6,
      name: "History",
      component: History,
    },
  ];
};

export const usecheckersTabData = () => {
  const { listCounts } = useListCount();

  return [
    {
      id: 1,
      name: "Sales Invoice",
      count: listCounts.checkerSaleInvoice,
      component: CheckerSalesInvoice,
    },
    {
      id: 2,
      name: "Zone Transfer",
      count: listCounts.checkerZoneTransfer,
      component: CheckerZoneTransfer,
    },
    {
      id: 3,
      name: "Scheduled Delivery",
      count: listCounts.checkerScheduledDelivery,
      component: CheckerScheduledDelivery,
    },
    {
      id: 4,
      name: "Receipts",
      count: listCounts.checkerReciepts,
      component: CheckerReciepts,
    },
  ];
};
