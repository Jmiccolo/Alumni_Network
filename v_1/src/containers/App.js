import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from "../store";
import {setAuthorizationToken, setCurrentBrother} from "../store/actions/auth";
import {BrowserRouter as Router} from "react-router-dom";
import '../App.css';
import Main from "./Main";
import jwtDecode from "jwt-decode";


const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering jwtToken key
  try{
    store.dispatch(setCurrentBrother(jwtDecode(localStorage.jwtToken)));
  }catch(e) {
    store.dispatch(setCurrentBrother({}));
  }
}

const App = () => {
  return(
    <Provider store={store}>
      <Router>
        <div className="onboarding">
         <Main />
        </div>
      </Router>
    </Provider>
  )
}


export default App;
