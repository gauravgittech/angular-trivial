import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  name = ''
  constructor(public dialog: MatDialog,private router: Router,public authService: AuthService) {
    this.authService.checkLoggedIn().subscribe(response=>{
      this.name = response
    })
   }

  ngOnInit(): void {
    this.name = localStorage.getItem('loggedIn') || ''
  }

    home(){
      this.router.navigate(['/banks'])
    }
    logout(){
      this.authService.setLogIn();
    }

}
