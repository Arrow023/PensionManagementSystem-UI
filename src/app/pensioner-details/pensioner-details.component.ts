import { Component, OnInit } from '@angular/core';
import { PensionerDetailsService } from '../services/pensioner-details.service';
import { PensionerDetails } from '../Shared/pensioner-details.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pensioner-details',
  templateUrl: './pensioner-details.component.html',
  styleUrls: ['./pensioner-details.component.css']
})
export class PensionerDetailsComponent implements OnInit {
  pensionerDetails : PensionerDetails;
  isLoading : boolean = true;
  constructor(private pdService : PensionerDetailsService) { }

  ngOnInit(): void {
    this.pdService.getPensionerDetails().subscribe((data:any)=>{
      this.isLoading = false;
      this.pensionerDetails = new PensionerDetails(data.name, 
                                                    new Date(data.dateOfBirth), 
                                                    data.pan,
                                                    data.aadhaarNumber,
                                                    data.salaryEarned,
                                                    data.allowances,
                                                    data.type,
                                                    data.bank);
      console.log(data);
    }, (error)=>{
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Close'
      })
      this.isLoading = false;
    })
  }

}
