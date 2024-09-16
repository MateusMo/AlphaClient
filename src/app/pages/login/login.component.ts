import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { DefaultReturnDto } from 'src/app/dto/defaultReturnDto';
import { LoginDto } from 'src/app/dto/loginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginDto = this.loginForm.value;

      this.loginService.registerUser(loginData).subscribe({
        next: (response: DefaultReturnDto<{ [key: string]: any }>) => {
          if (response.status === 200) {
            const token = response.data['Token'];
            const user = response.data['User'];
          }
        },
        error: (error) => {
          if(error.error.data.Data.status === 403){
            //criar validação do email enviado
          }
          if(error.error.data.Data.status === 409){
            //aviso de senha errada
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
}
