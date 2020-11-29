import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { createOrg } from '../store/actions/auth';
import { addError } from '../store/actions/errors';
import {latLong} from '../services/api';


const Organization = (props) => {
    const [orgName, setOrgName] = useState("");
    const [orgEmail, setOrgEmail] = useState("");
    const [orgWebsite, setOrgWebsite] = useState("");
    const [orgTag, setOrgTag] = useState("");
    const [orgAddress, setOrgAddress] = useState("");
    const [orgStreet, setOrgStreet] = useState("");
    const [orgCity, setOrgCity] = useState("");
    const [orgState, setOrgState] = useState("");
    const [orgZip, setOrgZip] = useState("");
    const [orgcolor1, setOrgColor1] = useState("#000000");
    const [orgcolor2, setOrgColor2] = useState("#000000");
    const [orgcolor3, setOrgColor3] = useState("#000000");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminFirst, setAdminFirst] = useState("");
    const [adminLast, setAdminLast] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminUser, setAdminUser] = useState("");
    let history = useHistory();
    function handleSubmit(e){
            e.preventDefault();
            let formatAddress = `${orgAddress} ${orgStreet},${orgCity},${orgState},${orgZip}`
            formatAddress = formatAddress.replaceAll(" ", "+");
            let hq = {};
            let data = async function(){
                return await latLong(formatAddress);
            } 
            data().then(res => {
                    console.log(res);
                    hq.type = "Point";
                    hq.coordinates = [res.lng, res.lat];
                const organization = {
                    name: orgName,
                    email: orgEmail,
                    website: orgWebsite,
                    tagline: orgTag,
                    address: `${orgAddress} ${orgStreet}, ${orgCity}, ${orgState} ${orgZip}`,
                    colors: [orgcolor1, orgcolor2, orgcolor3],
                    hq: hq
                }
                const admin = {
                    firstName: adminFirst,
                    lastName: adminLast,
                    username: adminUser,
                    email: adminEmail,
                    password: adminPassword
                }
                return props.createOrg(admin, organization)
                }).then(res => history.push("/"))
                .catch(err=> {props.addError(err.message)
                });
    }   
    return (
        <div className="orgForm">
            <div className="orgForm-container">
                <h1>Create Your Organization!</h1>
                {props.errors.message ?
                        <h3 style={{ color: 'red' }}>{props.errors.message}</h3>
                    : null
                }
                <form className="org-create-form" onSubmit={handleSubmit}>
                    <div className="form-div">
                        <label htmlFor="Organization">Organization</label>
                        <input type="text" name="Org-name" value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="Organization Name" />
                        <input type="email" name="Org-email" value={orgEmail} onChange={e => setOrgEmail(e.target.value)}placeholder="Organization Email" />
                        <input type="text" name="Org-website" value={orgWebsite} onChange={e => setOrgWebsite(e.target.value)} placeholder="Organization Website" />
                        <input type="text" name="org-Tagline" value={orgTag} onChange={e => setOrgTag(e.target.value)} placeholder="Organization Tagline" />
                        <label htmlFor="address">Address</label>
                        <div className="d-flex flex-wrap">
                           <div className="w-50">
                                <label htmlFor="org-address">Number</label>
                                <input type="number" name="org-address" value={orgAddress} onChange={e => setOrgAddress(e.target.value)}  />
                           </div>
                            <div className="w-50">
                                <label htmlFor="org-street">Street</label>
                                <input type="text" name="org-street" value={orgStreet} onChange={e => setOrgStreet(e.target.value)} />
                            </div>
                            <div className="w-50">
                                <label htmlFor="org-city">City</label>
                                <input type="text" name="org-city" value={orgCity} onChange={e => setOrgCity(e.target.value)} />
                            </div>
                            <div className="w-25">
                                <label htmlFor="org-State">State</label>
                                <input type="text" name="org-city" value={orgState} onChange={e => setOrgState(e.target.value)} />
                            </div>
                            <div className="w-25">
                                <label htmlFor="org-zip">Zip Code</label>
                                <input type="number" name="org-city" value={orgZip} onChange={e => setOrgZip(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-div">
                        <label htmlFor="administrator">Administrator</label>
                        <input type="email" name="admin-email" value={adminEmail} onChange={e=> setAdminEmail(e.target.value)} placeholder="Administrator email" />
                        <input type="text" name="admin-first" value={adminFirst} onChange={e => setAdminFirst(e.target.value)} placeholder="Administrator First Name" />
                        <input type="text" name="admin-last" value={adminLast} onChange={e => setAdminLast(e.target.value)} placeholder="Administrator Last Name" />
                        <input type="text" name="admin-user" value={adminUser} onChange={e => setAdminUser(e.target.value)} placeholder="Administrator Username" />
                        <input type="password" name="admin-password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} placeholder="Administrator Password" />
                        <label htmlFor="org-colors">Pick Colors</label>
                        <input type="color" value={orgcolor1} onChange={e => setOrgColor1(e.target.value)} name="org-color1" />
                        <input type="color" value={orgcolor2} onChange={e => setOrgColor2(e.target.value)} name="org-color2" />
                        <input type="color" value={orgcolor3} onChange={e => setOrgColor3(e.target.value)} name="org-color3" />
                        <div className="form-div-buttons">
                            <button className="btn btn-lg btn-success m-2 w-50">Submit</button>
                            <a href="/" className="btn btn-lg m-2 w-50 btn-danger">Back</a>
                        </div>
                    </div>
                </form>
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

export default connect(mapStateToProps, {addError, createOrg})(Organization);