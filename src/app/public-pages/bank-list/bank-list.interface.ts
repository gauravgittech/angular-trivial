export interface BankInformation {
    "id": Number,
    "uid": string,
    "account_number": string,
    "iban": string,
    "bank_name": string,
    "routing_number":string,
    "swift_bic": string,
    "comment_date"?:Date,
    "comment"?: string
  }