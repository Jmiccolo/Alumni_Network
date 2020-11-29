import { apiCall } from "../../services/api";
import { SET_CURRENT_ORG } from "../actionTypes";
import {addError, removeError} from "./errors";

export function setCurrentOrg(organization, isValidated){
    return{
        type: SET_CURRENT_ORG,
        organization,
        isValidated
    }
}

export function isAlumniValidated(alumni){
    return dispatch =>{
        return new Promise((resolve, reject)=>{
            return apiCall("post", "/api/organizations/validate", {id:alumni._id})
                .then(res => {
                    dispatch(setCurrentOrg(res.organization, res.isValidated));
                    resolve();
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject();
                })
        })
    }
}