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
    const [favouriteClick, setFavouriteClick] = useState<boolean>(false)



    const navigate = useNavigate();
    const location = useLocation();

    const navigateToDetails = () => {
        console.log(property._id)
        const newSearch = new URLSearchParams(location.search);
        newSearch.set("propertyId", property._id)
        navigate(`/property-detail/${property._id}`)
    }


    return (
        <div className="card" onClick={navigateToDetails}>
            <div className="container">
                <div className="image skeleton-box">

                    <div className="status">
                        <p>
                            {`For ${capitalize(property.property_status)}`}
                        </p>
                    </div>

                    <img src={property.images[0]} alt="Property" loading="lazy"/>

                    <Favourite isFavourite={favouriteClick} size={27} onClick={() => setFavouriteClick(prevState => !prevState)}/>

                </div>
                <div className="body">

                    <p className="price skeleton-box">
                        {property.property_status === PropertyStatus.Rent ? `$${property.price.toLocaleString()}/month` : `$${property.price.toLocaleString()}`}
                    </p>
                    <address className="skeleton-box">
                        {`${property.address}, ${property.city}, ${property.state_province} ${property.zipcode}`}
                    </address>

                    <div className="data skeleton-box">
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