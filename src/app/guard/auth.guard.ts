import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../service/http.service';


@Injectable(
  // {
  // providedIn: 'root'
// }
)
export class AuthGuard implements CanActivate {

  constructor(private http:HttpService,
              private _router: Router ) {}

  canActivate(): boolean {
    if(this.http.logged()) {
      return true
    } else {
      this._router.navigate(['user/signin'])
      // return false
    }
  }
}
