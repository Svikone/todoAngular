import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,  } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EApiUrls } from '../../core/enums/api-urls.enum';

type IToken = {
  token: string
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpService,
              private _router: Router) {
    this.signInForm = this.fb.group({
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  get _email() {
    return this.signInForm.get('email');
  }
  get _password() {
    return this.signInForm.get('password');
  }
 
  onSubmit() {
    const controls = this.signInForm
    const user = {
      email: controls.value.email,
      password: controls.value.password
    }
    this.http.post(EApiUrls.USER_SIGNIN,{user}).subscribe((value: IToken) =>{

      const data: IToken = value;
      localStorage.setItem('token', data.token);
      this._router.navigate(['board/card'])
      error => {
        // error - объект ошибки
        alert('вы ввели не верные данные')
      }
    });
    controls.reset()
  }
}
