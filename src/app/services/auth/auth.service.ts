import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subject } from 'rxjs';
import { LoginComponent } from 'src/app/public-pages/login/login.component';
import { RegisterComponent } from 'src/app/public-pages/register/register.component';
import { Credentials } from '../../public-pages/login/login.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn = new Subject<any>();

  constructor(private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {

  }
  setLogInStatus(value?: string) {
    if (!value) {
      /** Log the user out */
      localStorage.removeItem('loggedIn');
      this.router.navigate(['/banks'])
      this.toastr.success('You have logged out', 'Authentication')
    }
    this._loggedIn.next(value);
  }
  /** Opens the login and resgiter modal */
  openModal(type?: string) {
    this.dialog.closeAll();
    let dialogRef
    if (type == 'login') {
      dialogRef = this.dialog.open(LoginComponent, {
        width: '350px',
      })
    }
    else {
      dialogRef = this.dialog.open(RegisterComponent, {
        width: '370px',
      });
    }

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  /** To check the changes in subject loggedIn
   * loggedIn returned as observable
   */
  checkLoggedIn(): Observable<any> {
    return this._loggedIn.asObservable();
  }

  public checkCreds(creds: Credentials): Observable<boolean> {
    /** Checks the email in the localStorage
     * If found checks the password.
     * If password matches calls setLogInStatus with name of user
     */
    if (!localStorage.getItem(String(creds.email))) {
      this.toastr.error('Email does not exist', 'Authentication')
      return of(false)
    }
    const dbCreds = JSON.parse(localStorage.getItem(String(creds.email)) || '')
    if (creds.password == dbCreds['password']) {
      localStorage.setItem('loggedIn', dbCreds['name'])
      this.setLogInStatus(dbCreds['name']);
      this.dialog.closeAll()
      this.toastr.success("You're logged in!", 'Authentication')
      return of(true)
    } else {
      this.toastr.error('Invalid Credentials!', 'Authentication')
      return of(false)
    }
  }
  public createUser(creds: Credentials): Observable<string> {
    const profile = { name: creds.name, password: creds.password }
    /** Set the value of localStorage with email as key and name,password and values */
    localStorage.setItem(String(creds.email), JSON.stringify(profile))
    this.toastr.success('Your account has been successfully created. Please Log in.', 'Congratulations!')
    return of('User has been created')
  }
}
