import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnee } from '../models/abonnee';

@Injectable({
  providedIn: 'root'
})
export class AbonneeService {
  private apiUrl = 'http://localhost:8081/abonnees';

  constructor(private http: HttpClient) { }


  getAllabonnees(): Observable<Abonnee[]> {
    return this.http.get<Abonnee[]>(this.apiUrl, {
      responseType: 'json'
    });
  }

  getabonneeById(id: number): Observable<Abonnee> {
    return this.http.get<Abonnee>(`${this.apiUrl}/${id}`, {
      responseType: 'json'
    });
  }



  deleteabonnee(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      responseType: 'json'
    });
  }
}
