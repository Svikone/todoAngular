import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../service/http.service';
import { IUser } from '../../../core/interfaces/user.interface';
import { EApiUrls } from '../../../core/enums/api-urls.enum';
import { EPageMode } from '../../../core/enums/page-mode.enums';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()  item
  @Output() removeEmmiter = new EventEmitter()

  myForm = new FormGroup({
    selected: new FormControl('')
    
  })
  allusers: IUser[] = [];
  showUser: Boolean;
  feature: String;
  flipped: Boolean;
  EPageMode = EPageMode;


  constructor(private _router: Router,
              private http: HttpService,
              private activateRoute: ActivatedRoute) {
    this.feature = activateRoute.snapshot.routeConfig.path;
    
  }

  ngOnInit() {
    
  }

  removeItem(_id) {
    this.removeEmmiter.emit(_id)
  } 

  editItem(_id) {
    this._router.navigate(['board/edit/'+_id])
  }


  shared(id) {
    this.showUser = !this.showUser
    const _idShared = this.myForm.controls.selected.value.email
    console.log(this.myForm.controls.selected)
    this.http.post(EApiUrls.USER_ADD_SHARED,{_id: id, _idShared: _idShared}).subscribe(value =>{
    },
    error => {
    });
  }

  flipIt() {
    this.flipped = !this.flipped;
  }
  
  removeShared(shared,idCard) {
    this.http.post(EApiUrls.CARD_DELETE_SHARED,{_idCard: idCard, shared: shared}).subscribe(value =>{
    },
    error => {
    });
  }

  searchUsers(searchValue: String) {
      this.http.post(EApiUrls.CARD_SEARCH_USERS,{_searchValue: searchValue}).subscribe((value: IUser[]) =>{
        this.allusers = value
    },
    error => {
    });
  }

}

