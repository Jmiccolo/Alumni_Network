require("dotenv").config();
const emailjs = require("emailjs-com");


exports.verifyUser = async function(email, username, token){
    const templateParams = {email:email, username:username, token:token}
    return emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE, process.env.REACT_APP_EMAILJS_TEMPLATE, templateParams, process.env.REACT_APP_EMAILJS_USER)
}