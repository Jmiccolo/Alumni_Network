import React, {Component} from 'react';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/errors';


class AuthForm extends Component {
constructor(props){
    super();
    this.state = {
        username:"",
        email:"",
        password:""
    }
    this.textChange = this.textChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
}
textChange(e) {
    this.setState({[e.target.name]:e.target.value})
}
handleSubmit = function(e) {
    e.preventDefault();
    const authType = this.props.signUp ? "signup":"signin";
    this.props.authUser(authType, this.state).then(() => {
        this.props.history.push("/")
    })
}
handleBack(e){
    e.preventDefault();
    this.props.updatePage(e);
}

render(){
    const {buttonText, headingText, signUp, errors} = this.props;
    return (
        <div>
            <div></div>
            <h2 className="w-100 text-center">{headingText}</h2>
            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                <form className="Authform p-5"> 
                    {signUp && (<div className="form-group">
                    <label htmlFor="username" className="">Username:</label>
                    <input type="text" className="form-control w-50" name="username" value={this.state.username} onChange={this.textChange}/>
                    </div>)}
                    <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control w-50" name="email" value={this.state.email} onChange={this.textChange}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control w-50" name="password" value={this.state.password} onChange={this.textChange} />
                    </div>
                    <button className="btn btn-lg btn-danger" onClick={this.handleSubmit}>{buttonText}</button>
                    <button className="btn btn-lg btn-primary m-2" onClick={this.handleBack}>Back</button>
                </form>

        </div>
    )
}
}
const mapStateToProps = (state) => {
    return {
        currentBrother:state.currentBrother,
        errors:state.errors
    }
}


export default withRouter(connect(mapStateToProps, {authUser})(AuthForm));