import { apiCall, setTokenHeader, userVerify } from "../../services/api";
import { SET_CURRENT_ALUMNI } from "../actionTypes";
import {addError, removeError} from "./errors";

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
            return apiCall("post", `/api/auth/${type}`, alumniData).then(({ token, alumni, verifyToken }) => {
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                dispatch(setCurrentAlumni(alumni));
                dispatch(removeError());
                if(type === "signup"){
                userVerify(alumniData.email, alumniData.firstName, verifyToken.token)
                }
                resolve({alumni, token});
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
            .then(({token, alumni, verifyToken}) => {
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                dispatch(setCurrentAlumni(alumni));
                dispatch(removeError());
                userVerify(alumni.email, alumni.firstName, verifyToken);
                resolve();
            })
            .catch(err => {
                dispatch(addError(err.message))
                reject();
    })
})
}
}