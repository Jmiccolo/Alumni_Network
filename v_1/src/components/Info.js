import React from 'react';
import Map from '../images/Map.PNG';
import Calendar from "../images/calendar.jpg"
import Fraternity from "../images/fraternity.jpg"

const Info = props => {
    const {updatePage} = props;
    return (
        <div className="Info text-center">
            <h2>The Alumni Network</h2>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="card m-1">
                            <img className="img-thumbnail" src={Map} alt="Card image cap"/>
                            <div className="card-body border-none">
                                <h5 className="card-title">Find and Message Brothers</h5>
                                <p className="card-text">Contact Brothers from across the country with Easy Map locators and by category.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="card m-1">
                            <img className="img-thumbnail" src={Calendar} alt="Card image cap"/>
                            <div className="card-body border-none">
                                <h5 className="card-title">Schedule and Promote Events in Your Area</h5>
                                <p className="card-text">Organize your <strong>Calendar</strong> with local events and notifications</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="card m-1">
                            <img className="img-thumbnail" src={Fraternity} alt="Card image cap"/>
                            <div className="card-body border-none">
                                <h5 className="card-title">National Information</h5>
                                <p className="card-text">Get updates from around the country on what is happening in the Fraternity</p>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        <div className="w-100 d-flex justify-content-around">
            <button className="px-5 mx-3 btn btn-danger btn-lg border-dark" name="signUp"  onClick={updatePage}>Sign Up!</button>
            <button className="px-5 mx-3 btn btn-danger btn-lg border-dark" name="signIn" onClick={updatePage}>Sign In!</button>
            </div>
        </div>
       
    )
}

export default Info;