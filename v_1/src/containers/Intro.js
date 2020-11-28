import React, {Component} from "react";
import AuthForm from "../components/Authform";
import Info from "../components/Info";
import errors from "../store/reducers/errors";

class Intro extends Component {
    constructor(props){
        super(props)
        this.state = {
            signIn:false,
            signUp:false,
            headingText: "",
            buttonText:""
        }
        this.updatePage = this.updatePage.bind(this);
    }
    updatePage(e){
        if(e.target.name === "signUp"){
        this.setState({[e.target.name]:true, buttonText:"Sign Up!", headingText:"Welcome to The Alumni Network!"});
    }else if(e.target.name === "signIn"){
        this.setState({[e.target.name]:true, buttonText:"Log In!", headingText:"Welcome Back!"});
    }else{
        this.setState({signUp:false, signIn:false, buttonText:"", headingText:""}) 
    }
}

    render(){
        return(
            <div className="Intro">
                {this.state.signUp || this.state.signIn ? (
                    <AuthForm 
                    buttonText={this.state.buttonText} 
                    headingText={this.state.headingText}
                    signIn = {this.state.signIn}
                    signUp = {this.state.signUp}
                    updatePage = {this.updatePage}
                    />
                ) : (
                        <Info updatePage={this.updatePage}/>
                )}
            </div>
        )
    }
    }

export default Intro;