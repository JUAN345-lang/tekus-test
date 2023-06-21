import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { SubscribersResponse } from '../models/subscriber.model';
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

}