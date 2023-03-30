import React from 'react';
import "./about.scss"
import about_image from "../../assets/about.svg"

function About() {
    return (
        <div className="about" id="about-us">
            <div className="container">
                <div className="image-container">
                    <img src={about_image} alt="About us image" loading="lazy"/>
                </div>


                <div className="info">
                    <h2 className="title">
                        About us
                    </h2>
                    <div className="description">
                        <p>
                            We are a company that connects the world of real estate and finance. We provide a complete service for the sale, purchase or rental of real estate. Our advantage is more than 15 years of experience and soil in attractive locations in Slovakia with branches in Bratislava and Košice.
                        </p>
                        <p>
                            We have a connection to all banks on the Slovak market, so we can solve everything under one roof. By constantly innovating our business activities, we move forward and we are able to offer truly above-standard services that set us apart from the competition.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default About;