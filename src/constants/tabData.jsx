import {
  SalesInvoice,
  ZoneTransfer,
  ScheduledDelivery,
  StockCountView,
  History
} from '../screens';

const tabData = [
  {id: 1, name: 'Sales Invoice', component: SalesInvoice},
  {id: 2, name: 'Zone Transfer', component: ZoneTransfer},
  {id: 3, name: 'Scheduled Delivery', component: ScheduledDelivery},
  {id: 4, name: 'Stock Count View', component: StockCountView},
  {id: 5, name: 'History', component: History},
];

export default tabData;
