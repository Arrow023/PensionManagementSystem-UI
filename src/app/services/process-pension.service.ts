import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessPensionService {
  aadhaarNumber = new BehaviorSubject<any>(null);
  constructor(private http:HttpClient) { }

  getPensionDetails(aadhaarNumber)
  {
      return this.http.post<any>(environment.ProcessPensionUrl+"ProcessPension",{
        "aadhaarNumber" : aadhaarNumber.toString()
      }).pipe(catchError(this.handleError));

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
}
