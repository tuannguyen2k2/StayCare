export interface IContract {
  id: number;
  typeOfRoom: string;
  packageName: string;
  price: number;
  deposit?: number;
  status: number;
  startDate: string;
  dueDate: string;
}

export interface IContractUpdate {
  id : number;
  type_room : string;
  package : string;
  pay_money : number;
  deposit?: number;
  status: string;
  start_date : string;
  due_date : string;
  file_pdf : string;
}

export interface IContractUpload {
  contract_id : number;
  file_pdf : File;
}

export interface IContractCheck {
  house_detail_id : number;
  start_date : Date;
}