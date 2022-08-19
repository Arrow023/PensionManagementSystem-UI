import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ProcessPensionService } from '../services/process-pension.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formSubmitted : boolean = false;
  
  constructor(private ppService : ProcessPensionService) { }

  ngOnInit(): void {
  }

  fetchPensionDetails(f:NgForm)
  {
    this.formSubmitted = false;
    this.formSubmitted = true;
    var aadhaarNumber = f.value.aadhaarNumber;
    this.ppService.aadhaarNumber.next(+aadhaarNumber);
  }

}
