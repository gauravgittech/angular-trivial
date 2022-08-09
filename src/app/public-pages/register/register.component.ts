import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    private router: Router, public authService: AuthService
  ) { }
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    repeatPassword: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  })

  get userEmail(): any {
    return this.registerForm.get('email');
  }

  get userName(): any {
    return this.registerForm.get('name');
  }
  get userPassword(): any {
    return this.registerForm.get('password');
  }
  get userRepeatPassword(): any {
    return this.registerForm.get('repeatPassword');
  }

  register(){
    if (this.registerForm.valid) {
      // API for registeration
      const creds = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      this.authService.createUser(creds).subscribe(res => {
        this.dialog.closeAll()
      })
    }
  }
  
  ngOnInit(): void {
  }

}
