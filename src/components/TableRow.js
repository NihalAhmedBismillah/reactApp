import React, { Component } from "react";
import { Link } from "react-router-dom";
import HttpHelper from "../helper/http";
import { baseUrl } from "../helper/constants";


class TableRow extends Component {
  constructor(props, context) {
    super(props, context);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    HttpHelper.delete(`${baseUrl}user/${this.props.obj._id}`)
      .then(response => {
        console.log("User deleted!");
        this.props.onDeleteMessage(this.props.obj._id);
      })
      .catch(error => {
        console.log("error: ", JSON.stringify(error));
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.srNo}</td>
        <td>{this.props.obj.userName}</td>
        <td>{this.props.obj.emailId}</td>
        <td>{this.props.obj.address}</td>
        <td>{this.props.obj.mobileNo}</td>
        <td>
          <Link to={"/edit/" + this.props.obj._id} className="btn btn-primary">
            Edit
          </Link>
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.onDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
