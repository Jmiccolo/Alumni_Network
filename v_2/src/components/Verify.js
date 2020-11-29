import React, {useEffect, useState} from 'react';
import { useParams, Redirect } from 'react-router';
import {verifyUser} from '../store/actions/verify';
import {addError} from '../store/actions/errors';

const Verify = () => {
    const [verified, setVerify] = useState(false)
    let {token} = useParams();
    useEffect(()=>{
            let verifyToken = verifyUser(token)
            verifyToken().then(res=> {
                setVerify(true);
            }).catch(err=>console.log(err));
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