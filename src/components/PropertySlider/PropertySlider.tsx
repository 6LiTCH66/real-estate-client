import React, {FC} from 'react';
import "./propertySlider.scss"
import {PropertyCard} from "../index";


interface PropertySliderProps{
    scrollRef?: React.Ref<HTMLDivElement>
    styles?: React.CSSProperties
}

const PropertySlider:FC<PropertySliderProps> = ({scrollRef, styles}) => {
    return (
        <div className="property-slider" style={styles} ref={scrollRef}>
            {Array(8).fill(0).map((_, index) =>(
                <PropertyCard key={index} myKey={index}/>

            ))}

        </div>
    );
}

export default PropertySlider;