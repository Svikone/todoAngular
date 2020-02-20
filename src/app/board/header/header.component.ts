import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { EApiUrls } from '../../core/enums/api-urls.enum';
import { IUser } from '../../core/interfaces/user.interface'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showUser: Boolean = false
  public user: IUser;
  public showMenuWindow: Boolean;
  public showMenu: Boolean;

  public width: Number = window.window.innerWidth;

  constructor(private http: HttpService) { }

  ngOnInit() {
    // this.width
    this.getUserId()
    this.closeMenu()
  }

  getUserId() {
    this.http.get(EApiUrls.USER_GET_ID).subscribe((value: IUser) =>{
      this.user = value
    },
    error => {
    });
  }
 ///Просмотр размера екрана 
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    this.closeMenu()
  }

  closeMenu() {
    if(this.width < 930) {
      if(!this.showMenu) {
        this.showMenuWindow = false
      }
    }
    else {
      this.showMenuWindow = true
      this.showMenu = false

    }
  }
  ////////////////

}
