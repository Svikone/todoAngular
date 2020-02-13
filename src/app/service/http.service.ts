import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

//Нужно подключить enveroment и в каждом запросе добавить api_url, убрать во всех компонентах
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  public httpOptions = {
    headers: new HttpHeaders({
      'x-access-token': localStorage.getItem('token') || 'x-access-token',
      'Content-Type':  'application/json',
    })
  };

  post<T>(url: string, body: any = {}) {
    this.httpOptions = this.reCoolHeader()
    return this.http.post(this.fullUrl()+url, body, this.httpOptions).pipe(
      // map((response) => {
        // if (response.status === 401) {
        //   this.redirect();
        // }
      // }),
      catchError((err) => throwError(err))
    )as Observable<T>;
  }

  get<T>(url) {
    this.httpOptions = this.reCoolHeader()
    return this.http.get(this.fullUrl()+url,this.httpOptions).pipe(
      catchError((err) => throwError(err))
    ) as Observable<T>
  } 

  delete<T>(url: string, body: any = {}): Observable<any> {
    this.httpOptions = this.reCoolHeader()

    return this.http.delete(this.fullUrl()+url, this.httpOptions).pipe(
      // map((response) => {
      //   return response.body;
      // }),
      catchError((err) => throwError(err))
    )as Observable<T>;
  }

  logged() {
    console.log(!!localStorage.getItem('token'))
    return !!localStorage.getItem('token')
  }//можно не выносить а писать сразу в guard, используеться в гуард

  reCoolHeader() {
    return {
      headers: new HttpHeaders({
      'x-access-token': localStorage.getItem('token') || 'x-access-token',
      'Content-Type':  'application/json',
      })
    }
  }

  fullUrl() {
    return environment.apiUrl+environment.prefix
  }// принимает с енваирмент и вызываем в каждом запросе, нужно переделать
}
