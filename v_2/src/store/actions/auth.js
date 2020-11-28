import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_ALUMNI } from "../actionTypes";
import {addError, removeError} from "./errors";
import {withRouter} from "react-router-dom";

export function setCurrentAlumni(alumni){
    return{
        type: SET_CURRENT_ALUMNI,
        alumni
    }
}

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logout() {
    return (dispatch) => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentAlumni({}));
    }
}
export function authUser(type, alumniData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, alumniData).then(({ token, id }) => {
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                dispatch(setCurrentAlumni(id));
                dispatch(removeError());
                resolve({id, token});
            }
            )
                .catch(err => {
                    dispatch(addError(err.message));
                    reject();
                });
        })
    }
}

export function createOrg(admin, org) {

    return dispatch => {
        return new Promise((resolve, reject)=> {
            return apiCall("post", `/api/organizations/new`, {admin, org})
            .then(({token, id}) => {
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                dispatch(setCurrentAlumni(id));
                dispatch(removeError());
                resolve();
            })
            .catch(err => {
                dispatch(addError(err.message))
                reject();
    })
})
}
}