import React, {FC, useEffect, useState} from 'react';
import "./propertySlider.scss"
import {PropertyCard, PropertyCardSekeleton} from "../index";
import {getProperty} from "../../http/propertyAPI";
import {Property} from "../../types/Property";


interface PropertySliderProps{
    scrollRef?: React.Ref<HTMLDivElement>
    styles?: React.CSSProperties
}

const PropertySlider:FC<PropertySliderProps> = ({scrollRef, styles}) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getProperty().then((properties) => {
            setProperties(properties)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    
    return (
        <div className="property-slider" style={styles} ref={scrollRef}>
            {!loading ? (
                properties?.slice(0, 8).map((property, index) =>(
                    <PropertyCard key={index} property={property}/>

                ))
            ): (
                Array(8).fill(0).map((_, index) => (
                    <PropertyCardSekeleton key={index}/>
                ))
            )}

        </div>
    );
}

export default PropertySlider;