import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const authUrl = 'http://lukabudagovi-001-site1.atempurl.com/api/User/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authworkerUrl =
    ' http://lukabudagovi-001-site1.atempurl.com/api/Worker/add-schedule-request';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(authUrl + 'users');
  }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(authUrl + 'jobs');
  }

  getDashboard() {
    return this.http.get(authUrl + 'dashboard');
  }

  addScheduleRequest(scheduleData: any): Observable<any> {
    return this.http.post(`${this.authworkerUrl}`, scheduleData);
  }
}
