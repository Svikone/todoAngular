import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../ngmaterial-module';
import { UserComponent } from './user.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';

const routes: Routes = [
  {
    path:'',
    component: UserComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signout',
        component: SignoutComponent
      }
    ]
  },
];


@NgModule({
  declarations: [
    SignoutComponent,
    SigninComponent,
    UserComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]

})
export class UserModule { }
