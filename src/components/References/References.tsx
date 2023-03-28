import React from 'react';
import "./references.scss"
import ReferencesCard from "./ReferenceCard/ReferencesCard";

function References() {
    return (
        <div className="references">
            <div className="container">
                <h2 className="title">
                    References
                </h2>
                <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus rutrum donec ultricies cras id ac.
                </p>

                <div className="reference-cards">
                    <ReferencesCard/>
                    <ReferencesCard/>


                </div>

                <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>

                </div>
            </div>
        </div>
    );
}

export default References;