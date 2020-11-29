import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {connect} from 'react-redux';

function Dashboard(props) {
    let {color1, color2, color3} = props.currentOrg;
    let headerStyle = {
        color: color1,
        backgroundColor:color2    
    }
    return (
        <div>
            <div style={headerStyle} className="header">
                <h1>{props.currentOrg}</h1>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentAlumni: state.currentAlumni,
        currentOrg: state.currentOrg,
        errors: state.errors
    };
}

export default connect(mapStateToProps)(Dashboard);