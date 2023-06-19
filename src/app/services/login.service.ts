import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public login(data: {
    userName: string;
    password: string;
  }): Observable<{ status: string; Token: string }> {
    return this.httpClient.post<{ status: string; Token: string }>(
      `${this.baseUrl}/account/login`,
      data
    );
  }

  public setUserToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
