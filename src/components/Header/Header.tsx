import React, {useEffect} from 'react';
import "./header.scss"
import header_picture from "../../assets/header_picture.svg"
import {BsChevronDown} from "react-icons/bs"
import {useState, useRef} from "react";

function Header() {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)

    const propertyTypes: string[] = ["Condo", "Multi Family Home", "Farm", "Single Family Home", "Townhouse", "Apartment", "Land", "Duplex"]
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let updatedList = [...selectedProperties];
        if (event.target.checked) {
            updatedList = [...selectedProperties, event.target.value];

        } else {
            updatedList.splice(selectedProperties.indexOf(event.target.value), 1);
        }

        setSelectedProperties(updatedList);
    };



    return (
        <div className="header">
            <div className="container">
                <div className="info">
                    <p className="title">Modern living for everyone</p>

                    <p className="description">
                        We provide a complete service for the sale, purchase or rental of real estate. We have been operating in Madrid and Barcelona more than 15 years.
                    </p>

                    <div className="search_bar-container">
                        <div className="search_bar">
                            <button className="property-type" type="button" onClick={() => setOpenDropDown(prevState => !prevState)}>
                                <span>
                                    {!selectedProperties.length ? "Property type" : selectedProperties.toString()}
                                </span>
                                <BsChevronDown size={16} className="arrow-down"/>
                            </button>

                            <ul className="property_dropdown" style={{display: openDropDown ? "block": "none"}}>
                                <li>
                                    <input type="checkbox"  id="any" checked={!selectedProperties.length} readOnly={true}/>
                                    <label htmlFor="any">Any</label>
                                </li>
                                {propertyTypes.map((type:string, index:number) => (

                                    <li key={index}>
                                        <input type="checkbox"  id={type} value={type} onChange={handleCheck}/>
                                        <label htmlFor={type}>{type}</label>
                                    </li>
                                ))}

                            </ul>
                        </div>


                    </div>


                </div>
                <img src={header_picture} alt="Header logo" className="header_image" loading="lazy"/>
            </div>
        </div>
    );
}

export default Header;