import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  localhost:string='https://localhost:7032/api';
  constructor() { }
}
