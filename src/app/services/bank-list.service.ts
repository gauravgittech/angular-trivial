import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankInformation } from '../public-pages/bank-list/bank-list.interface'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankListService {
  constructor(private http:HttpClient) { }


  public getBankList() : Observable<BankInformation[]>{

   const bankUrl = 'https://random-data-api.com/api/bank/random_bank?size=100'
   return this.http.get<BankInformation[]>(bankUrl)

  }
}
