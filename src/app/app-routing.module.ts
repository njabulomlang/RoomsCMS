import { UpdateComponent } from './update/update.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ViewRoomComponent } from './view-room/view-room.component';
import { PageComponent } from './page/page.component';
//import { SignInComponent } from './sign-in/sign-in.component';
//import { HomeComponent } from './home/home.component';

const routes: Routes = [
{path: 'login', component : SigninComponent},
{path: 'register', component : SignupComponent},
{path: 'user', component : UsersComponent},
{path: 'home', component : HomeComponent},
{ path:"view/:key", component: ViewRoomComponent},
{path: 'add', component : PageComponent},
{path: 'update', component : UpdateComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
