import { Subscriber } from 'src/app/models/subscriber.model';

export const columnsSubscribers: Array<{
  columnDef: string;
  header: string;
  cell: (element: Subscriber) => string;
}> = [
  {
    columnDef: 'Area',
    header: 'Area',
    cell: (element: Subscriber) => `${element.Area}`,
  },
  {
    columnDef: 'Name',
    header: 'Name',
    cell: (element: Subscriber) => `${element.Name}`,
  },
  {
    columnDef: 'Email',
    header: 'Email',
    cell: (element: Subscriber) => `${element.Email}`,
  },
  {
    columnDef: 'JobTitle',
    header: 'Job Title',
    cell: (element: Subscriber) => `${element.JobTitle}`,
  },
  {
    columnDef: 'PhoneCodeAndNumber',
    header: 'Phone Number',
    cell: (element: Subscriber) => `${element.PhoneCodeAndNumber}`,
  },
  {
    columnDef: 'SubscriptionStateDescription',
    header: 'Subscription State',
    cell: (element: Subscriber) => `${element.SubscriptionStateDescription}`,
  },
  {
    columnDef: 'selectedSubscriber',
    header: 'Actions',
    cell: (element: Subscriber) => `${element.Id}`
  }
];
