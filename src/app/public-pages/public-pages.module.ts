import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    BankListComponent
  ],
  imports: [
    CommonModule,
    PublicPagesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PublicPagesModule { }
