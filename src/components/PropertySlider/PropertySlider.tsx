import React, {FC, useEffect, useState} from 'react';
import "./propertySlider.scss"
import {PropertyCard} from "../index";
import {getProperty} from "../../http/propertyAPI";
import {Property} from "../../types/Property";


interface PropertySliderProps{
    scrollRef?: React.Ref<HTMLDivElement>
    styles?: React.CSSProperties
}

const PropertySlider:FC<PropertySliderProps> = ({scrollRef, styles}) => {
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        getProperty().then((properties) => {
            setProperties(properties)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    
    return (
        <div className="property-slider" style={styles} ref={scrollRef}>
            {properties?.slice(0, 8).map((property, index) =>(
                <PropertyCard key={index} property={property}/>

            ))}

        </div>
    );
}

export default PropertySlider;