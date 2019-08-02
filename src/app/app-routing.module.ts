import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
//import { SignInComponent } from './sign-in/sign-in.component';
//import { HomeComponent } from './home/home.component';

const routes: Routes = [
{path: 'login', component : SigninComponent},
{path: 'register', component : SignupComponent},
{path: 'user', component : UsersComponent},
{path: 'home', component : HomeComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
