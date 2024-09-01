import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUserDto } from 'src/app/dto/postUserDto';
import { RegisterService } from 'src/app/services/register.service';
import { ModalsComponent } from 'src/app/shared/modals/modals.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  @ViewChild('confirmationModal') confirmationModal!: ModalsComponent;
  modalMessage = '';

  constructor(private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      photo: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(25), Validators.maxLength(250)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const postUserDto: PostUserDto = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        photo: formValues.photo,
        title: formValues.title,
        description: formValues.description
      };
      this.registerService.registerUser(postUserDto).subscribe((res) => {
        if(res.status == 201 || res.status == 200){
          this.modalMessage = res.message;
          this.confirmationModal.open();
            this.confirmationModal.okClicked.subscribe(() => {
              this.router.navigate(['']);
            });
        }
        if(res.status != 201){
          this.modalMessage = res.message;
          this.confirmationModal.open();  
        }
      }, (error) => {
        this.modalMessage = 'Unaviable service - Try again later';
        this.confirmationModal.open();
      });
    } else {
      this.modalMessage = this.getValidationErrors();
      this.confirmationModal.open();
    }
  }

  private getValidationErrors(): string {
    let errors = '';

    for (const field in this.registerForm.controls) {
      if (this.registerForm.controls[field].invalid) {
        const control = this.registerForm.get(field);
        if (control?.errors) {
          for (const errorKey in control.errors) {
            errors += `Field ${field}: ${this.getErrorMessage(field, errorKey)}\n`;
          }
        }
      }
    }

    return errors || 'Please fill out all required fields correctly.';
  }

  private getErrorMessage(field: string, errorKey: string): string {
    switch (field) {
      case 'name':
        switch (errorKey) {
          case 'required':
            return 'Name is required.';
          case 'minlength':
            return 'Name must be at least 3 characters long.';
          case 'maxlength':
            return 'Name cannot be longer than 100 characters.';
          default:
            return 'Invalid name.';
        }
      case 'email':
        switch (errorKey) {
          case 'required':
            return 'Email is required.';
          case 'email':
            return 'Please enter a valid email address.';
          case 'maxlength':
            return 'Email cannot be longer than 255 characters.';
          case 'minlength':
            return 'Email must be at least 3 characters long.';
          default:
            return 'Invalid email.';
        }
      case 'password':
        switch (errorKey) {
          case 'required':
            return 'Password is required.';
          case 'minlength':
            return 'Password must be at least 8 characters long.';
          case 'maxlength':
            return 'Password cannot be longer than 40 characters.';
          case 'pattern':
            return 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
          default:
            return 'Invalid password.';
        }
      case 'photo':
        switch (errorKey) {
          case 'required':
            return 'Photo ID is required.';
          case 'pattern':
            return 'Photo ID must be a number.';
          default:
            return 'Invalid photo ID.';
        }
      case 'title':
        switch (errorKey) {
          case 'required':
            return 'Title is required.';
          case 'minlength':
            return 'Title must be at least 3 characters long.';
          case 'maxlength':
            return 'Title cannot be longer than 20 characters.';
          default:
            return 'Invalid title.';
        }
      case 'description':
        switch (errorKey) {
          case 'required':
            return 'Description is required.';
          case 'minlength':
            return 'Description must be at least 25 characters long.';
          case 'maxlength':
            return 'Description cannot be longer than 250 characters.';
          default:
            return 'Invalid description.';
        }
      default:
        return 'Invalid value.';
    }
  }

}
