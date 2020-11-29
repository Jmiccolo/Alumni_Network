import React, {useEffect, useState} from 'react';
import { useParams, Redirect } from 'react-router';
import {useHistory} from 'react-router-dom';
import {verifyUser} from '../store/actions/verify';
import {addError} from '../store/actions/errors';

const Verify = () => {
    let history = useHistory();
    const [verified, setVerify] = useState(false)
    let {token} = useParams();
    useEffect(()=>{
            let verifyToken = verifyUser(token)
            verifyToken().then(res=> {
                setVerify(true);
            }).catch(err=> history.push("/"));
            },[]);
        if(!verified){
        return (
            <div>
                Please Wait While We Verify your account
            </div>
        )
        }else{
            return <Redirect to="/"/>
        }
    }


export default Verify;