import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading : boolean = false;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {

  }

  onSubmit(f:NgForm)
  {
    console.log(f.controls['username'].valid);
    this.isLoading = true;
    const value = f.value;
    console.log(value);
    this.authService.login(value.username, value.password)
      .subscribe((response)=>{
          this.isLoading = false;
          this.router.navigate(["/"]);
      },(error)=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Close'
        })
        this.isLoading = false;
      })
      
    f.reset();
  }

}
