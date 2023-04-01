import React from 'react';
import "./header.scss"
import header_picture from "../../assets/header_picture.svg"
import {BsChevronDown} from "react-icons/bs"
import {useState} from "react";
import {ImLocation} from "react-icons/im"
import Image from "../Image"
import {Button} from "../UI";
import {ButtonProps} from "../../types/ButtonClickProps";

interface Property{
    city: string,
    state: string,
}


function Header() {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)
    const propertyTypes: string[] = ["Condo", "Multi Family Home", "Farm", "Single Family Home", "Townhouse", "Apartment", "Land", "Duplex"]

    const properties: Property[] = [
        {city:"Chicago", state: "Illinois"},
        {city:"Denver", state: "Colorado"},
        {city:"Los angeles", state: "California"},
        {city:"Dallas", state: "Texas"},
        {city:"Austin", state: "Texas"},
        {city:"Orlando", state: "Florida"},
    ]

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

    const [search, setSearch] = useState<string>("");

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let updatedList = [...selectedProperties];
        if (event.target.checked) {
            updatedList = [...selectedProperties, event.target.value];

        } else {
            updatedList.splice(selectedProperties.indexOf(event.target.value), 1);
        }

        setSelectedProperties(updatedList);
    };

    const filterCities: Property[] = properties.filter((property) => {
        return property.city.toLowerCase().includes(search.toLowerCase()) || !search
    })

    const preventClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    }


    const regexEscape = (str: string) => str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");

    const boldify = (targetStr: string) => {
        return targetStr
            .split(new RegExp(`(${regexEscape(search)})`, "i"))
            .map((part: string, idx: number) =>
                idx % 2 ? (
                    <strong key={idx}>{part}</strong>
                ) : (
                    <React.Fragment key={idx}>{part}</React.Fragment>
                )
            );
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
                                    <input type="checkbox" id="any" checked={!selectedProperties.length} readOnly={true}/>
                                    <label htmlFor="any">Any</label>
                                </li>
                                {propertyTypes.map((type, index) => (

                                    <li key={index}>
                                        <input type="checkbox" id={type} value={type} onChange={handleCheck}/>
                                        <label htmlFor={type}>{type}</label>
                                    </li>
                                ))}

                            </ul>

                            <div className="wrapper">
                                <div className="icon-container">
                                    <ImLocation size={22} className="location-icon"/>
                                </div>
                                <input type="text" placeholder="Search of location" onChange={handleSearch}/>
                                <ul>

                                    {

                                        filterCities.length > 0 ? (
                                            filterCities.map((property, index) => (
                                                <li key={index}>
                                                    <a href="#">{boldify(property.city)}, {property.state}</a>
                                                </li>
                                            ))
                                        ): (
                                            <li>
                                                <a href="#" onClick={preventClick}>City not found</a>
                                            </li>
                                        )
                                    }



                                </ul>
                            </div>

                            <Button onClick={() => console.log("Hello from header")}/>
                        </div>




                    </div>


                </div>

                <div className="header_image">
                    <Image src={header_picture} alt={"Header logo"}/>
                </div>
            </div>
        </div>
    );
}

export default Header;