import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { EApiUrls } from '../../core/enums/api-urls.enum';
import { IUser } from '../../core/interfaces/user.interface'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showUser: Boolean = false
  public user: IUser;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getUserId()
  }

  getUserId() {
    this.http.get(EApiUrls.USER_GET_ID).subscribe((value: IUser) =>{
      this.user = value
    },
    error => {
    });
  }

}
