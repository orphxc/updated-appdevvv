import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl = 'http://localhost:3000/api/sessions';

  constructor(private http: HttpClient) {}

  getSessions() {
    return this.http.get(this.apiUrl);
  }

  addSession(session: any) {
    return this.http.post(this.apiUrl, session);
  }

  deleteSession(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  updateSession(id: string, session: any) {
    return this.http.put(`${this.apiUrl}/${id}`, session);
  }
}
