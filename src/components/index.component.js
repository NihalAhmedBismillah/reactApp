import React, { Component } from "react";
import HttpHelper from "../helper/http";
import TableRow from "./TableRow";
import './index.css';
import { baseUrl } from "../helper/constants";
import { Alert } from 'reactstrap';



export default class Index extends Component {

  userClone = [];
  activePager = { pages: [] };
  pageSize = 10;
  pageNo = 1;
  disabledArrow = 'arrow-disable'
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      pageList: this.pageList,
      activePager: { pages: [] },
      visible: false
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.getNewPage = this.getNewPage.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDeleteMessage = this.onDeleteMessage.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }
  getPager(totalItems, pageSize, currentPage = 1) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage = 0;
    let endPage = 0;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pagesList = [];
    const step = 1;
    for (let i = startPage; i <= endPage; i += step) {
      pagesList.push(i);
    }
    if (totalItems <= pageSize) {
      pagesList = [];
    }
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pagesList
    };
  }

  componentDidMount() {
    this.getUserList(`${baseUrl}api/v1/user?pageno=${this.pageNo}&pagesize=${this.pageSize}`)
  }

  getUserList(url) {
    HttpHelper.get(url)
      .then(response => {
        this.setState({ user: response.data.data });
        this.userClone = response.data.data;

        this.setState({ activePager: this.getPager(response.data.totalItem, this.pageSize, response.data.currentPage) })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onDeleteMessage(userId) {
    this.setState({ visible: true });
    this.setState({ userId: userId });
  }

  getNewPage(pageNo) {
    this.pageNo = pageNo;
    this.getUserList(`${baseUrl}api/v1/user?pageno=${this.pageNo}&pagesize=${this.pageSize}`)
  }
  onTextChange(e) {
    if (+e.target.value.length === 2) {
      let searchedList = [];
      this.userClone.forEach((x) => {
        const myReg = new RegExp(e.target.value.toLowerCase() + '*.*');
        if (x.userName.toLowerCase().match(myReg)) {
          searchedList = [...searchedList, x];
        }
      });
      console.log(searchedList.length)
      this.setState({ user: searchedList });
    } else if (+e.target.value.length === 0) {
      this.setState({ user: this.userClone });
    }

  }
  setActive(item) {
    if (+this.state.activePager.currentPage === +item) return 'active';
    else return '';
  }
  disabledLeftArrow() {
    if (+this.state.activePager.currentPage === 1) return this.disabledArrow;
    else return '';
  }
  disabledRightArrow() {
    if (+this.state.activePager.currentPage === this.state.activePager.totalPages) return this.disabledArrow;
    else return '';
  }
  tabRow(deleteMessage) {
    return this.state.user.map(function (object, i) {
      return <TableRow obj={object} key={i} srNo={i + 1} onDeleteMessage={deleteMessage} />;
    });
  }
  pageNos() {
    return this.state.activePager.pages.map((item, index) => {
      return <span className={this.setActive(item)} key={item} onClick={() => this.getNewPage(item)} >
        {item}
      </span>
    })
  }


  render() {
    return (
      <div>
         <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
          User '{this.state.userId}' deleted successfully!
      </Alert>
        <h3 align="center">User List</h3>
        <input className="search-text" autoComplete="off" type="text" id="text_search" placeholder="Search user.." name="text_search" onChange={this.onTextChange}></input>
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
        <hr></hr>
        <div className="pagination">
          <span onClick={() => this.getNewPage(1)} >First</span>
          <span className={this.disabledLeftArrow()} onClick={() => this.getNewPage(this.state.activePager.currentPage - 1)} >&laquo;</span>
          <div>{this.pageNos()}</div>
          <span className={this.disabledRightArrow()} onClick={() => this.getNewPage(this.state.activePager.currentPage + 1)} >&raquo;</span>
          <span onClick={() => this.getNewPage(this.state.activePager.totalPages)} >Last</span>
        </div>
        <hr></hr>
        <div className="mrg-30">
        </div>
      </div>
    );
  }
}
