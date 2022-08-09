import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BankListService } from 'src/app/services/bank-list.service';
import { BankInformation } from './bank-list.interface'

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allBanks: BankInformation[] = []
  displayedRows: BankInformation[] = []
  size = 10
  displayedColumns = ["id",
    "bank_name",
    "comments",
    "action"]

  constructor(private bankListService: BankListService, private router: Router) {
    this.getAllBanks()
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((page) => {
      this.displayedRows = this.allBanks.slice((page.pageIndex) * this.size, (page.pageIndex + 1) * this.size)
    })

  }

  getAllBanks() {
    /** Get the list from the API and save it in the localStorage
     * fetch the list from localStorage
     * the record stored locally in order to post the comments
     */
    if (!localStorage.getItem('bankList')) {

      this.bankListService.getBankList().subscribe((res: BankInformation[]) => {

        localStorage.setItem('bankList', JSON.stringify(res))
        this.allBanks = res
        this.displayedRows = this.allBanks.slice(0, this.size)
      })
    } else {

      this.allBanks = JSON.parse(localStorage.getItem('bankList') || '')
      this.displayedRows = this.allBanks.slice(0, this.size)
    }

  }

  redirectTo(bank: BankInformation) {
    /** Pass the variable in the query Params */
    this.router.navigate(['/bank-details'], {
      queryParams: {
        id: bank.id,
        name: bank.bank_name,
        routing_number: bank.routing_number,
        swift: bank.swift_bic,
        account_no: bank.account_number,
        comment: bank.comment,
        comment_date: bank.comment_date
      }
    })
  }
}
