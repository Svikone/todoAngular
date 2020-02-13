import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardModule} from './board/board.module';
import { UserModule} from './user/user.module';
import { AuthGuard } from './guard/auth.guard';
import { EAppUrls } from './core/enums/app-urls.enums';


const routes: Routes = [
  {
    path: EAppUrls.BOARD,
    loadChildren: () => BoardModule,
    canActivate: [AuthGuard],
  },
  {
    path: EAppUrls.USER,
    loadChildren: () => UserModule
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ],
})
export class AppRoutingModule { }
