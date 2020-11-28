import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_BROTHER } from "../actionTypes";
import {addError, removeError} from "./errors";

export function setCurrentBrother(brother){
    return{
        type: SET_CURRENT_BROTHER,
        brother
    }
}

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logout() {
    return (dispatch) => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentBrother({}));
    }
}
export function authUser(type, brotherData){
    return dispatch => {
        return new Promise((resolve, reject)=>{
            try {
                const { token, ...brother } = apiCall("post", `/api/auth/${type}`, brotherData);
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                setCurrentBrother(brother);
                dispatch(removeError());
                resolve();
            } catch (err) {
                debugger;
                dispatch(addError(err.message));
                reject();
            }
        })
    }
    debugger;
}