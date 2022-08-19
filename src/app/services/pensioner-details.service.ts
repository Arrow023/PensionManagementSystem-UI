import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PensionerDetailsService {

  constructor(private http: HttpClient) { }

  getPensionerDetails()
  {
    return this.http.get(environment.PensionerDetailsUrl+"PensionerDetail?aadharNumber=0")
                    .pipe(catchError(this.handleError));
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
