import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { logout } from "../store/actions/auth";
import homelogo from "../images/PhiMuAlphaSinfoniaCrest.png"

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }
    render() {
        return (
            <nav className="navbar">
                <div>
                   <img src={homelogo} alt="homelogo" style={{width:'20px', height:'auto'}}/> 
                </div>
                <div>
                    <ul className="nav">
                                <Link to="/messages">Messages</Link>
                                <Link to="/calendar">Calendar</Link>
                                <Link to="/:brotherId">Profile</Link>
                                <li>
                                    <a onClick={this.logout}>Log Out</a>
                                </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return{
        currentBrother: state.currentBrother
    };
}

export default connect(mapStateToProps, {logout})(Navbar);