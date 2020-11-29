import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {connect} from 'react-redux';

function Dashboard(props) {
    let [orgColors, setOrgColors] = useState([]);
    let [orgName, setOrgName] = useState("");

    useEffect(()=>{

    }, [])
    return (
        <div>
            <div className="header">
                <h1>{orgName}</h1>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentAlumni: state.currentAlumni,
        errors: state.errors
    };
}

export default connect(mapStateToProps)(Dashboard);