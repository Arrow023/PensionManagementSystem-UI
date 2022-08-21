import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoadingSpinnerComponent } from './Shared/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PensionerDetailsComponent } from './pensioner-details/pensioner-details.component';
import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { ProcessPensionComponent } from './process-pension/process-pension.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    HeaderComponent,
    PensionerDetailsComponent,
    ProcessPensionComponent,
    FooterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, 
    useClass:AuthInterceptorInterceptor,
    multi:true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
