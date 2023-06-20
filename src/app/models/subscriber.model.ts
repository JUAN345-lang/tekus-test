export interface SubscribersResponse {
  Count?: number;
  Data?: Subscriber[],
}

export interface Subscriber {
  SystemId?: string,
  Area?: string,
  PublicId?: number,
  CountryCode?: string,
  CountryName?: string,
  Name?: string,
  Email?: string,
  JobTitle?: string,
  PhoneNumber?: number,
  PhoneCode?: number,
  PhoneCodeAndNumber?: string,
  LastActivityUtc?: string,
  LastActivity?: string,
  SubscriptionDate?: string,
  SubscriptionMethod?: number,
  SubscriptionState?: number,
  SubscriptionStateDescription?: string,
  Activity?: string,
  ConnectionState?: number,
  Id?: number
}