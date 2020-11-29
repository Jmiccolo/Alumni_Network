import {apiCall} from '../../services/api';
import {setCurrentAlumni} from "../actions/auth";
import {addError} from "../actions/errors";

export function verifyUser(token) {
        return dispatch => {
            return new Promise((resolve, reject)=>{
                return apiCall("post", "http://localhost:3000/api/verify", {token})
                .then(res => {
                    setCurrentAlumni(res.id);
                    resolve(res);
                })
                .catch(err => {
                    addError(err.message);
                    reject();
                })
            })
        }
}