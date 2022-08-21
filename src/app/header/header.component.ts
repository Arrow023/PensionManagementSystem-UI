import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn : boolean ;

  constructor(private authService : AuthService) { }
  ngOnInit(): void {
    this.authService.user.subscribe((data)=>{
      if(data == null)
        this.isLoggedIn = false;
      else
        this.isLoggedIn = true;
    })
  }

  logout()
  {
    this.authService.logOut();
  }

}
