import { useListCount } from "../context/ListCountContext";
import {
  SalesInvoice,
  ZoneTransfer,
  ScheduledDelivery,
  StockCountView,
  History,
  CheckerSalesInvoice,
  CheckerZoneTransfer,
  CheckerScheduledDelivery,
  CheckerStockCountView,
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
  ];
};
