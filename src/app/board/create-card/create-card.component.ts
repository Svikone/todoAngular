import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpService } from '../../service/http.service'
import { EApiUrls } from '../../core/enums/api-urls.enum';




@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  checkoutForm: FormGroup;
  fullDate: String;

  constructor(private fb: FormBuilder,private http: HttpService){
    this.checkoutForm = this.fb.group({
      note: new FormControl(''),
      name: new FormControl(''),
      title: new FormControl(''),
    });
  }

  ngOnInit() {
    this.fullDate = new Date().toLocaleString();
  }
  
  onSubmit() {
    const controls = this.checkoutForm
    this.addNotes()
    controls.reset()
  }
  addNotes() {
    const controls = this.checkoutForm.controls
    const note = controls.note.value
    const name = controls.name.value
    const title = controls.title.value
    this.fullDate = new Date().toLocaleString()

    this.http.post(EApiUrls.CARD_ADD,{
      note: note, 
      name: name, 
      title: title, 
      date: this.fullDate 
    }).subscribe(value =>{
    },
    error => {
        // error - объект ошибки
    });
  }
}
