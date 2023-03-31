import React from 'react';
import "./propertyList.scss"
import {PropertyCard} from "../index";

function PropertyList() {
    return (
        <div className="property-list">
            <div className="list-container">

                {Array(12).fill(0).map((_, index) => (
                    <PropertyCard key={index} myKey={index}/>

                ))}



            </div>
        </div>
    );
}

export default PropertyList;