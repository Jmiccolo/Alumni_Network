import axios from "axios";
import emailjs from "emailjs-com"

export function setTokenHeader(token) {
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiCall (method, path, data){
    return new Promise((resolve, reject)=> {
        return axios[method](path, data).then(res=>{
            return resolve(res.data);
        })
        .catch(err => {
            return reject(err.response.data.error);
        })
    })
}

export function latLong(location){
    return new Promise((resolve, reject) => {
        return axios["get"](`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAPQUEST_KEY}&location=${location}`)
            .then(res=>{
                return resolve(res.data.results[0].locations[0].latLng);
            })
            .catch(err => {
                return reject(err)
            })
    })
}

export function userVerify(email, name, token){
    emailjs.send(process.env.REACT_APP_USER_EMAILJS_SERVICE, process.env.REACT_APP_USER_EMAILJS_TEMPLATE, { email, name, token }, process.env.REACT_APP_EMAILJS_USER).then(res=> res).catch(err=>{console.log(err); return err});
}