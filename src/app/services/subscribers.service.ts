import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Subscriber, SubscribersResponse } from '../models/subscriber.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  private readonly subscribersPath = 'subscribers'
  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public allSubscribers(page: number = 1, count:number = 10, sortOrder: string = '', sortType: number = 0): Observable<SubscribersResponse> {
    return this.httpClient.get<SubscribersResponse>(
      `${this.baseUrl}/${this.subscribersPath}?page=${page}&count=${count}&sortOrder=${sortOrder}&sortType=${sortType}`
    );
  }

  public addSubscribers( Subscribers: Subscriber[]): Observable<string> {
    const payload = {
      Subscribers
    }
    return this.httpClient.post<string>(`${this.baseUrl}/${this.subscribersPath}/`, payload)
  }

  public removeSubscriber(Id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${this.subscribersPath}/${Id}`)
  }

  public editSubscriber( subscriber: Subscriber): Observable<void> {

    return this.httpClient.put<void>(`${this.baseUrl}/${this.subscribersPath}/${subscriber.Id}`, subscriber)
  }

}