import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProcessPensionService } from '../services/process-pension.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-process-pension',
  templateUrl: './process-pension.component.html',
  styleUrls: ['./process-pension.component.css']
})
export class ProcessPensionComponent implements OnInit {
  isLoading : boolean = true;
  responseData : any;
  constructor(private ppService : ProcessPensionService) { 
    this.ppService.aadhaarNumber.subscribe(()=>{
      this.ppService.getPensionDetails(this.ppService.aadhaarNumber.value)
      .subscribe(data =>{
          this.isLoading = false;
          this.responseData = data;
      },(error)=>{
        this.responseData = false;
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Close'
        })
        this.isLoading = false;
      });
    })
  }

  ngOnInit(): void {
    this.ppService.getPensionDetails(this.ppService.aadhaarNumber.value)
    .subscribe(data =>{
        this.isLoading = false;
        this.responseData = data;
    },(error)=>{
      this.responseData = false;
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Close'
      })
      this.isLoading = false;
    });
  }

}
