import React, {FC, useState} from 'react';
import "./propertyCard.scss"
import {Favourite} from "../index";
import {Property} from "../../types/Property";
import {PropertyStatus} from "../../types/PropertyStatus";
// import {capitalize} from "../../utils/capitalizeText";
import {capitalize} from "lodash";
import {useLocation, useNavigate} from "react-router-dom";

interface PropertyCardProps{
    property: Property;
}

const PropertyCard:FC<PropertyCardProps> = ({property}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const navigateToDetails = () => {
        const newSearch = new URLSearchParams(location.search);
        newSearch.set("propertyId", property._id)
        navigate(`/property-detail/${property._id}`)
    }


    return (
        <div className="card" >
            <Favourite size={27} propertyId={property._id}/>

            <div className="container" onClick={navigateToDetails}>
                <div className="image">

                    <div className="status">
                        <p>
                            {`For ${capitalize(property.property_status)}`}
                        </p>
                    </div>

                    <img src={property.images[0]} alt="Property" loading="lazy"/>


                </div>
                <div className="body">

                    <p className="price">
                        {property.property_status === PropertyStatus.Rent ? `$${property.price.toLocaleString()}/month` : `$${property.price.toLocaleString()}`}
                    </p>
                    <address >
                        {`${property.address}, ${property.city}, ${property.state_province} ${property.zipcode}`}
                    </address>

                    <div className="data">
                        <p>
                            <strong>{property.bedrooms}</strong> bed
                        </p>
                        <p>
                            <strong>{property.bathrooms}</strong> bath
                        </p>
                        <p>
                            <strong>{property.square_footage.toLocaleString()}</strong> sqft
                        </p>
                        <p>
                            {property.property_type}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default PropertyCard;