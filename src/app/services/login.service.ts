import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs';
import { DefaultReturnDto } from '../dto/defaultReturnDto';
import { LoginDto } from '../dto/loginDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${this.environment.localhost}/Login`;
  constructor(private http: HttpClient,private environment:EnvironmentService) { }
  registerUser(loginData: LoginDto): Observable<DefaultReturnDto<{ [key: string]: any }>> {
    return this.http.post<DefaultReturnDto<{ [key: string]: any }>>(this.apiUrl, loginData);
  }
}
