import React, {Component} from "react";
import {Link} from "react-router-dom";
import shuffle from 'shuffle-array';
import Homepage from "../components/Homepage";
import Intro from "../containers/Intro";


const Landing = () =>  {
        const images = ["a","b", "c", "d", "e", "f", "g"]
        const random = Math.floor(Math.random() * images.length);
    return(
    <div className="home-hero">
        <Intro />
    </div>
    )
};

export default Landing;