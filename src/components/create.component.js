import React, { Component } from "react";
import HttpHelper from "../helper/http";
import User from "./../model/user/user.model";
import { baseUrl } from "../helper/constants";
import { Alert } from 'reactstrap';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmailId = this.onChangeEmailId.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeMobileNo = this.onChangeMobileNo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = new User();
  }

  onChangeUserName(e) {
    this.setState({
      userName: e.target.value
    });
  }
  onChangeEmailId(e) {
    this.setState({
      emailId: e.target.value
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  onChangeMobileNo(e) {
    this.setState({
      mobileNo: e.target.value
    });
  }
  onDismiss() {
    this.setState({ visible: false });
    this.setState({ _id: '' });
  }
  onSubmit() {
    const userPayload = new User(this.state).toJson();
    HttpHelper.post(`${baseUrl}user`, userPayload)
      .then(response => {
        console.log("Data: response:", response);
        // Clear data
        this.setState(new User());
        this.setState({ _id: response.data._id });
        this.setState({ visible: true })
      })
      .catch(error => {
        console.log("Data: error:", error);
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
          User saved {this.state._id} successfully!
      </Alert>
        <h3>Add New User</h3>
        <form>
          <div className="form-group">
            <label>User Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.userName}
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              value={this.state.emailId}
              onChange={this.onChangeEmailId}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              value={this.state.address}
              onChange={this.onChangeAddress}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Mobile No: </label>
            <input
              type="text"
              value={this.state.mobileNo}
              onChange={this.onChangeMobileNo}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="button"
              value="Register"
              onClick={this.onSubmit}
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
