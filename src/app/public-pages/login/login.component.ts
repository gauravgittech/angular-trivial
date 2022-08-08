import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  })

  get userEmail(): any {
    return this.loginForm.get('email');
  }

  get userPassword(): any {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
  }
  login() {
    if (this.loginForm.valid) {
      // API for authentication
      const creds = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authService.checkCreds(creds).subscribe(res => {
        if (res) {
          const savedUrl = localStorage.getItem('savedUrl')
          if (savedUrl) {
            /** redirect to detail page if request came before login */
            this.router.navigateByUrl(savedUrl)
            this.dialog.closeAll()
          }
        }
      })
    }
  }

}
