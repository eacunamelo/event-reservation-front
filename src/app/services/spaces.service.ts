import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SpacesService {

  private apiUrl = environment.apiUrl + 'spaces';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getSpaces(type?: string, capacity?: string, date?: string): Observable<any> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    if (capacity) params = params.set('capacity', capacity);
    if (date) {
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      if (formattedDate) {
        params = params.set('date', formattedDate);
      }
    }

    return this.http.get(this.apiUrl, { params });
  }

  getSpaceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createSpace(spaceData: any): Observable<any> {
    return this.http.post(this.apiUrl, spaceData);
  }

  updateSpace(id: number, spaceData: any): Observable<any> {
    spaceData.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/${id}`, spaceData);
  }

  deleteSpace(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
