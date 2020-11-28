import React, { Component } from "react";
import { connect } from 'react-redux';
import { authUser } from '../store/actions/auth';
import { addError } from '../store/actions/errors';
import { apiCall } from "../services/api";
import emailjs from "emailjs-com";

class Landing extends Component {
    constructor(props) {
        super();
        this.state = {
            signup: false,
            signin: false,
            email: "",
            password: "",
            username: "",
            organizations: [],
            chosenOrg: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    handleClick(e) {
        e.preventDefault();
        if (e.target.name !== "back") {
            this.setState({ [e.target.name]: true });
        }
        else {
            this.setState({ signin: false, signup: false });
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.chosenOrg){
            this.props.addError("Please Choose An organization!")
        }else{
        const authType = this.state.signin ? "signin" : "signup";
        const alumni = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };
            this.props.authUser(authType, alumni).then(res => {
            const templateParams = {email:alumni.email, username:alumni.username, token:res.token};
            return emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE, process.env.REACT_APP_EMAILJS_TEMPLATE, templateParams, process.env.REACT_APP_EMAILJS_USER)})
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    }
    componentDidMount() {
        apiCall("get", "/api/organizations")
            .then(organizations => {
                this.setState({ organizations: organizations })
            })
            .catch(err => console.log(err));
    }
    render() {
        const organizations = this.state.organizations.map((val,index) => {
            return <option key={index} value={val._id}>{val.name}</option>
        })

        return (
            <div id="landing">
                <h1>The Alumni Network</h1>
                <h2 className="text-center">A place for Post-Grad Greek Life to reach out and connect with their    Alumni</h2>
                {this.props.errors ? 
                <h3 style={{color:'red'}}>{this.props.errors.message}</h3>
                :null}
                {!this.state.signin && !this.state.signup ?
                    <div>
                        <button onClick={this.handleClick} name="signup" className="btn btn-lg btn-danger m-1">Sign Up</button>
                        <button onClick={this.handleClick} name="signin" className="btn btn-lg btn-danger m-1">Sign In</button>
                    </div>
                    :
                    <div className="form-container">
                        <form onSubmit={this.handleSubmit}>
                            <select name="chosenOrg" id="chosenOrg" onChange={this.handleChange}>
                                <option value="">Select Your Organization</option>
                                {organizations}
                            </select>
                            <input type="email" name="email" placeholder="email" onChange={this.handleChange} />
                            {this.state.signup ?
                                <input type="text" name="username" placeholder="username" onChange={this.handleChange} /> : null}
                            <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
                            <input type="submit" className="btn btn-lg btn-danger" />
                        </form>
                        <div>
                            <button onClick={this.handleClick} name="back" className="btn btn-lg btn-danger m-1">Back</button>
                        </div>
                    </div>
                }
                <a className="org-link" href="/organization">Create an Organization</a>
            </div>    
            )
}
}
function mapStateToProps(state) {
    return {
        currentAlumni: state.currentAlumni,
        errors: state.errors
    };
}


export default connect(mapStateToProps, { authUser, addError })(Landing);