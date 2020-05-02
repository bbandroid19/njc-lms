export class RegisterModel {
  userid: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  address_line1: string;
  country: string;
  pincode: string;
  phone_numbers: string;
  college_id: string;

  constructor() {
    this.userid = "";
    this.password = "";
    this.firstname = "";
    this.lastname = "";
    this.city = "";
    this.state = "";
    this.address_line1 = "";
    this.country = "";
    this.pincode = "";
    this.phone_numbers = "";
    this.college_id = "";
  }
}
