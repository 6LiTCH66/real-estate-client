import React, {FC} from 'react';
import "./propertySlider.scss"
import {PropertyCard} from "../index";


interface PropertySliderProps{
    scrollRef?: React.Ref<HTMLDivElement>
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
}
const PropertySlider:FC<PropertySliderProps> = ({scrollRef, onScroll}) => {
    return (
        <div className="property-slider" ref={scrollRef} onScroll={onScroll}>
            {Array(8).fill(0).map((_, index) =>(
                <PropertyCard key={index} myKey={index}/>

            ))}

        </div>
    );
}

export default PropertySlider;