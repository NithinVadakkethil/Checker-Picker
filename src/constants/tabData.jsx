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
  CheckerHistory
} from '../screens';

export const pickersTabData = [
  {id: 1, name: 'Sales Invoice', component: SalesInvoice},
  {id: 2, name: 'Zone Transfer', component: ZoneTransfer},
  {id: 3, name: 'Scheduled Delivery', component: ScheduledDelivery},
  {id: 4, name: 'Stock Count View', component: StockCountView},
  {id: 5, name: 'History', component: History},
];

export const checkersTabData = [
  {id: 1, name: 'Sales Invoice', component: CheckerSalesInvoice},
  {id: 2, name: 'Zone Transfer', component: CheckerZoneTransfer},
  {id: 3, name: 'Scheduled Delivery', component: CheckerScheduledDelivery},
  {id: 4, name: 'Stock Count View', component: CheckerStockCountView},
  {id: 5, name: 'History', component: CheckerHistory},
];
