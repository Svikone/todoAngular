import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,  } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Validators } from '@angular/forms';
import { EApiUrls } from '../../core/enums/api-urls.enum';
import { ICard } from '../../core/interfaces/card.interface';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
  editForm: FormGroup;
  public card: ICard;
  id: number;
  // fullDate: String;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private activateRoute: ActivatedRoute,
    private _router: Router) {
      this.editForm = this.fb.group({
        note: new FormControl(''),
        name: new FormControl(''),
        title: new FormControl(''),
      });

      this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getCardId()
  }

  getCardId() {
    this.http.get(EApiUrls.CARD+this.id).subscribe((value: ICard) => {
      this.card = value
      this.formInit()
    },
    error => {
      // error - объект ошибки
    });
  }

  formInit() {
    this.editForm = this.fb.group({
      note: new FormControl(this.card.note),
      name: new FormControl(this.card.name),
      title: new FormControl(this.card.title),
    });
  }

  editCard() {
    const controls = this.editForm.controls
    const note = controls.note.value
    const name = controls.name.value
    const title = controls.title.value

    this.http.post(EApiUrls.CARD_EDIT+this.id,{
      note: note, 
      name: name, 
      title: title, 
      date: this.card.date
    }).subscribe(value =>{
      this._router.navigate(['board/card'])
    },
    error => {
        // error - объект ошибки
    });
  }

  onSubmit() {
    const controls = this.editForm
    this.editCard()
    controls.reset()
  }
}
