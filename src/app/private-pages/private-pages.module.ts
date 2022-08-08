import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivatePagesRoutingModule } from './private-pages-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ BankDetailsComponent ],
  imports: [
    CommonModule,
    PrivatePagesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class PrivatePagesModule { }
