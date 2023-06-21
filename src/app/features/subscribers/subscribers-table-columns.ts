import { Subscriber } from 'src/app/models/subscriber.model';

export const columnsSubscribers: Array<{
  columnDef: string;
  header: string;
  cell: (element: Subscriber) => string;
  item: (element: Subscriber) => Subscriber;
}> = [
  {
    columnDef: 'Area',
    header: 'Area',
    cell: (element: Subscriber) => `${element.Area}`,
    item: (element: Subscriber) => element
  },
  {
    columnDef: 'Name',
    header: 'Name',
    cell: (element: Subscriber) => `${element.Name}`,
    item: (element: Subscriber) => element
  },
  {
    columnDef: 'Email',
    header: 'Email',
    cell: (element: Subscriber) => `${element.Email}`,
    item: (element: Subscriber) => element
  },
  {
    columnDef: 'JobTitle',
    header: 'Job Title',
    cell: (element: Subscriber) => `${element.JobTitle}`,
    item: (element: Subscriber) => element
  },
  {
    columnDef: 'PhoneCodeAndNumber',
    header: 'Phone Number',
    cell: (element: Subscriber) => `${element.PhoneCodeAndNumber}`,
    item: (element: Subscriber) => element
  },
  {
    columnDef: 'SubscriptionStateDescription',
    header: 'Subscription State',
    cell: (element: Subscriber) => `${element.SubscriptionStateDescription}`,
    item: (element: Subscriber) => element
  },
  {
    columnDef: 'selectedSubscriber',
    header: 'Actions',
    cell: (element: Subscriber) => `${element.Id}`,
    item: (element: Subscriber) => element
  }
];
