import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private authenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, userData);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}me`);
  }

  getRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || null;
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}logout`, {});
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.authenticatedSubject.next(true);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.authenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthenticatedStatus(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role === 'admin';
  }
}
