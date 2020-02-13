import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../ngmaterial-module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCardComponent } from './create-card/create-card.component';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { CardComponent } from './all-cards/card/card.component';
import { BoardComponent} from './board.component';
import { HeaderComponent } from './header/header.component';
import { EditCardComponent } from './edit-card/edit-card.component';

const routes: Routes = [
  {
    path:'',
    component: BoardComponent,
    children: [
      {
        path: 'create',
        component: CreateCardComponent
      },
      {
        path: 'card',
        component: AllCardsComponent
      },
      {
        path: 'edit/:id',
        component: EditCardComponent
      },
      {
        path: 'card/:id',
        component: AllCardsComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    BoardComponent,
    CreateCardComponent,
    HeaderComponent,
    AllCardsComponent,
    CardComponent,
    EditCardComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]

})

export class BoardModule { }
