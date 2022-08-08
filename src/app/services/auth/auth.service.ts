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
  setLogIn(value?:string){
    if(!value){
      localStorage.removeItem('loggedIn');
      this.router.navigate(['/banks'])
    }
    this._loggedIn.next(value);
  }
  openModal(type?:string){
    this.dialog.closeAll();
    let dialogRef
      if(type == 'login'){
       dialogRef = this.dialog.open(LoginComponent , {
        width: '350px',
      })}
      else {
       dialogRef = this.dialog.open(RegisterComponent, {
        width: '370px',
      });
      }

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  checkLoggedIn(): Observable<any> {
    return this._loggedIn.asObservable();
  }

  public checkCreds(creds: Credentials): Observable<string> {

    if (!localStorage.getItem(String(creds.email))) {
      this.toastr.error('Email does not exist','Authentication')
      return of('Email does not exist')
    }
    const dbCreds = JSON.parse(localStorage.getItem(String(creds.email)) || '')
    if (creds.password == dbCreds['password']) {
      localStorage.setItem('loggedIn',dbCreds['name'])
      this.setLogIn(dbCreds['name']);
      this.dialog.closeAll()
      this.toastr.success("You're logged in!",'Authentication')
      return of("You're logged in!")
    } else {
      this.toastr.error('Invalid Credentials!','Authentication')
      return of('Invalid Credentials')
    }
  }
  public createUser(creds: Credentials): Observable<string> {
    const profile = { name: creds.name, password: creds.password }

    localStorage.setItem(String(creds.email), JSON.stringify(profile))
    this.toastr.success('User has been created ! Please Log In','Authentication')
    return of('User has been created')
  }
}
