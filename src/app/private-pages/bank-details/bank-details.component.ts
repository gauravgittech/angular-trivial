import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  bankDetails: any;
  comment: string;
  commentDate: any

  constructor(private route: ActivatedRoute,private toastr: ToastrService,private router: Router) {

   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bankDetails = params
      this.comment = params['comment'];
      this.commentDate = params['comment_date'] ? new Date(params['comment_date']) : ''
    });
    localStorage.removeItem('savedUrl')
  }
  submit() {
    this.commentDate = new Date();
    const bankList = JSON.parse(localStorage.getItem('bankList') || '');
    const updatedList = bankList.map((el: {
      comment: string;
      comment_date: Date; id: any; 
      }) => {
      if(el.id == this.bankDetails.id){
        el.comment = this.comment.trim()
        el.comment_date = this.commentDate
      }
      return el
    });
    localStorage.setItem('bankList',JSON.stringify(updatedList))
    this.toastr.success('Coment updated successfully!','Success')
    setTimeout(()=>this.router.navigate(['/banks']),2000)
  }
}
