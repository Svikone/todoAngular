import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,  } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Validators } from '@angular/forms';
import { EApiUrls } from '../../core/enums/api-urls.enum';
import { Router} from '@angular/router';


@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {
  signOutForm: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpService,
              private _router: Router) {
    this.signOutForm = this.fb.group({
      name: ['', [Validators.required]],
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required]],
      confirm: ['', [Validators.required]]
    },{validator: this.test});
  }
  
  ngOnInit() {
    
  }
  
  get _name() {
    return this.signOutForm.get('name');
  }
  get _email() {
    return this.signOutForm.get('email');
  }
  get _password() {
    return this.signOutForm.get('password');
  }
  get _confirm() {
    return this.signOutForm.get('confirm');
  }
  test(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    const controls = this.signOutForm
    const user = {
      name: controls.value.name,
      email: controls.value.email,
      password: controls.value.password
    }
    this.http.post(EApiUrls.USER_ADD,{user}).subscribe(value =>{
      this._router.navigate(['user/signin'])

    },
    error => {
      // error - объект ошибки
    });
    controls.reset()
  }

}
