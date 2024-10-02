import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private apiUrl = environment.apiUrl + 'reservations';

  constructor(private http: HttpClient) { }

  getUserReservations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(this.apiUrl, reservationData);
  }

  updateReservation(id: number, reservationData: any): Observable<any> {
    reservationData.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/${id}`, reservationData);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
