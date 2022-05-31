import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Users } from '../models/users';
import { Ground } from '../models/ground';
import { Schedule } from '../models/schedule';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'https://jahuga.badrobotspy.com/api/';
  //API_URL = 'http://127.0.0.1:8000/api/';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };

  constructor(private http: HttpClient) { }

  /*** Handle API errors ***/
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  /*** grounds ***/
  public getGrounds(): Observable<Ground[]> {
    return this.http.get<Ground[]>(this.API_URL + 'grounds', this.httpHeader);
  }

  public getGroundById(id): Observable<Ground> {
    return this.http.get<Ground>(this.API_URL + 'grounds/' + id, this.httpHeader);
  }

  public addGround(ground: Ground): Observable<Ground> {
    return this.http.post<Ground>(this.API_URL + 'grounds', ground, this.httpHeader);
  }

  public updateGround(groundId: number, ground: Ground): Observable<Ground> {
    return this.http.put<Ground>(this.API_URL + 'grounds/' + groundId, ground, this.httpHeader);
  }

  public deleteGround(groundId: number): Observable<Ground> {
    return this.http.delete<Ground>(this.API_URL + 'grounds/' + groundId, this.httpHeader);
  }

  /*** get Schedules ***/
  public getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API_URL + 'schedules', this.httpHeader);
  }

  /*** get Schedules ***/
  public getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.API_URL + 'bookings', this.httpHeader);
  }

  public addBooking(ground: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.API_URL + 'bookings', ground, this.httpHeader);
  }

  /*** get User ***/
  public getUsers(): Observable<Users> {
    return this.http.get<Users>(this.API_URL + 'users/', this.httpHeader).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public getUserById(id): Observable<Users> {
    return this.http.get<Users>(this.API_URL + 'users/' + id, this.httpHeader).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}