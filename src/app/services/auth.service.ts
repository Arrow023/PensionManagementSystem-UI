import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User } from '../Shared/user.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer : any;
  constructor(private http: HttpClient, private router:Router) { }

  signup(username:string, password:string)
    {
        return this.http.post<any>
        (environment.JwtUrl+"register",
        {
            Username : username,
            Password : password
        })
        .pipe(catchError(this.handleError));
    }

    autoLogin()
    {
        const userData : {
            email : string;
            id : string;
            _token :string;
            _tokenExpirationDate : string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData)
            return;
        const loadedUser = new User(+userData.id,userData.email,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token)
        {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }


    login(username:string , password:string)
    {
        return this.http.post<any>(environment.JwtUrl + "authenticate",
        {
            Username : username,
            Password : password
        })
        .pipe(catchError(this.handleError),
        tap(responseData =>{
            this.handleAuthentication(
                +responseData.id,
                responseData.username,
                responseData.token,
                +responseData.expiresIn)
                }
            )
        );
    }

    logOut()
    {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration : number)
    {
        this.tokenExpirationTimer = setTimeout(()=>{
            Swal.fire({
                title: 'Info!',
                text: "Your session has been timed out",
                icon: 'info',
                confirmButtonText: 'Close'
              })
            this.logOut();
        },expirationDuration);
    }

    private handleError(errorResponse : HttpErrorResponse)
    {
        let errorMessage = 'An unknown error occurred';
        if(!errorResponse.error || !errorResponse.error.message)
        {
            return throwError(errorMessage);
        }
        else
        {
          return throwError(errorResponse.error.message);
        }
    }

    private handleAuthentication(id:number, username:string, token:string, expiresIn:number)
    {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            +id,
            username,
            token,
            expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }



}
