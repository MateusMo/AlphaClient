import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { PostUserDto } from '../dto/postUserDto';
import { DefaultReturnDto } from '../dto/defaultReturnDto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${this.environment.localhost}/User`;
  constructor(private http: HttpClient,private environment:EnvironmentService) { }
  registerUser(userData: PostUserDto): Observable<DefaultReturnDto<PostUserDto>> {
    return this.http.post<DefaultReturnDto<PostUserDto>>(this.apiUrl, userData);
  }
}
