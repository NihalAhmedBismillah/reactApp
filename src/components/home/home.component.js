import React, { Component } from "react";
import './home.css';
// import HttpHelper from "../../helper/http";
// import { baseUrl } from "../../helper/constants";


export default class Home extends Component {
    constructor(props) {
        super(props);
        // this.onChangeUserName = this.onChangeUserName.bind(this);
        console.log('data: ', props)
    }



    render() {
        return (
            <div>
                <h3 className="search-title">N Search</h3>
                <form>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search"></input>
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="submit">
                                <i className="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
