import React from "react";
import { connect } from 'react-redux';
import { apiCall } from "../services/api";
import { useEffect, useState } from "react";
import OrgForm from "./OrgForm"

function Homepage(props) {
    const [organization, setOrg] = useState(null);
    useEffect(()=>{
        apiCall("get", `api/alumni/${props.currentAlumni.id}`)
        .then(alumni =>  {
            if(alumni.organization){
            apiCall("get", `api/organizations/${alumni.organization}`)
            .then(organization=>{
                setOrg(organization._id);
            })
        }else{
            setOrg("");
        }
    })
    .catch(err => console.log(err));
    },[])
    if(props.currentAlumni.isVerified){
    return (
        <div>
            {organization ?
            <div>Made It!</div>
            :
            <OrgForm/>
            }
        </div>
    )
    }else {
        return (
            <div className="orgForm">
                <div className="orgForm-container">
                    We have sent an email to verify your account for the safety of your organization. Until you are verified we cannot confirm your acceptance to an organization.
            </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentAlumni: state.currentAlumni,
        errors: state.errors
    };
}

export default connect(mapStateToProps)(Homepage);
