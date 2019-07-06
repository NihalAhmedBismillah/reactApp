import React, { Component } from "react";
import HttpHelper from "../helper/http";
import TableRow from "./TableRow";
import { baseUrl } from "../helper/constants";
import { Alert } from 'reactstrap';


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      userId: '', visible: false
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onDeleteMessage = this.onDeleteMessage.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }
  componentDidMount() {
    HttpHelper.get(`${baseUrl}user`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onDeleteMessage(userId) {
    this.setState({ visible: true });
    this.setState({ userId: userId });
  }

  tabRow(deleteMessage) {
    return this.state.user.map(function (object, i) {
      return <TableRow obj={object} key={i} srNo={i + 1} onDeleteMessage={deleteMessage} />;
    });
  }

  render() {
    return (
      <div>
        <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
          User '{this.state.userId}' deleted successfully!
      </Alert>
        <h3 align="center">User List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>User Name</th>
              <th>Email Id</th>
              <th>Address </th>
              <th>Mobile No </th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow(this.onDeleteMessage)}</tbody>
        </table>
      </div>
    );
  }
}
