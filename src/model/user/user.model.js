class User {
  constructor(values) {
    this._id = "";
    this.userName = "";
    this.emailId = "";
    this.address = "";
    this.mobileNo = "";
    this.visible=false;
    if (values) {
      Object.assign(this, values);
    }
  }

  toJson() {
    let user = {
      userName: this.userName,
      emailId: this.emailId,
      address: this.address,
      mobileNo: this.mobileNo
    };
    if (this._id) {
      user._id = this._id;
    }
    return user;
  }
}
export default User;
