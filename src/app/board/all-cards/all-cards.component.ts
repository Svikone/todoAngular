import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ICard } from '../../core/interfaces/card.interface';
import { EApiUrls } from '../../core/enums/api-urls.enum';
import { Router, ActivatedRoute} from '@angular/router';
import { EPageMode } from '../../core/enums/page-mode.enums';


@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit {
  allcards: ICard[] =  []
  feature: String;
  

  constructor(private http: HttpService,
              private activateRoute: ActivatedRoute) { 
    this.feature = activateRoute.snapshot.routeConfig.path;
  }

  ngOnInit() {
    this.allCards()
  }
  remove(_id) {
    console.log(_id)
    this.http.delete(EApiUrls.CARD_REMOVE+_id).subscribe(value =>{
      this.allCards()
    },
    error => {
      // error - объект ошибки
    });
  }

  allCards() {
    if(this.feature == EPageMode.SHARED) {
      this.http.get(EApiUrls.CARD_ALL_SHARED).subscribe((value: ICard[])  =>{
        this.allcards = value
        console.log(this.allcards)
  
      },
      error => {
        // error - объект ошибки
      });
    }
    else {
      this.http.get(EApiUrls.CARD_ALL).subscribe((value: ICard[])  =>{
        this.allcards = value
        console.log(this.allcards)
  
      },
      error => {
        // error - объект ошибки
      });
    }
  }

  
}
