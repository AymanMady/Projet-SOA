import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnee } from '../models/abonnee';

@Injectable({
  providedIn: 'root'
})
export class AbonneeService {
  private apiUrl = 'https://07w10ay1jh.execute-api.eu-north-1.amazonaws.com/prod/abonnees';

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
