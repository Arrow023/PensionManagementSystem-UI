import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PensionerDetailsComponent } from './pensioner-details/pensioner-details.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path : "", component:HomeComponent, canActivate:[AuthGuard]},
  {path : "pensionerdetails", component:PensionerDetailsComponent, canActivate:[AuthGuard]},
  {path : "login", component:LoginComponent},
  {path : "register", component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
