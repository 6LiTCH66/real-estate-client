import React, {useEffect} from 'react';
import "./header.scss"
import header_picture from "../../assets/header_picture.svg"
import {BsChevronDown} from "react-icons/bs"
import {useState} from "react";
import {ImLocation} from "react-icons/im"
import Image from "../Image"
import {Button} from "../UI";
import {handleCheck} from "../../utils/getSelectedProperties";
import property_json from "../../data/property.json"
import {boldify} from "../../utils/boldify";
import {filterProperty} from "../../utils/filterProperty";
import {FilteredDropdownSearch} from "../index";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setHeaderSearch} from "../../store/searchSlice";
import {PropertyType} from "../../types/PropertyType";
import {PropertyStatus} from "../../types/PropertyStatus";

export interface Property{
    city: string,
    state: string,
}


function Header() {
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)

    const propertyTypes: string[] = Object.values(PropertyType);

    const properties: Property[] = property_json.states

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);


    const [search, setSearch] = useState<string>("");

    const preventClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }

    const searchByFilter = () => {
        const newSearch = new URLSearchParams(location.search);
        if (search){
            newSearch.set('city', search);

        }

        if (selectedProperties.length){
            newSearch.set("type", selectedProperties.toString());

        }
        history(`homes/buy?${newSearch}`)
    }

    useEffect(() => {
        dispatch(setHeaderSearch(selectedProperties.toString()))
    }, [selectedProperties]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    }

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
                                        <input type="checkbox" id={type} value={type} onChange={(event) => handleCheck(event, setSelectedProperties, selectedProperties)}/>
                                        <label htmlFor={type}>{type}</label>
                                    </li>
                                ))}

                            </ul>

                            <div className="wrapper">
                                <div className="icon-container">
                                    <ImLocation size={22} className="location-icon"/>
                                </div>
                                <input type="text" placeholder="Search location" onChange={handleSearch}/>
                                <ul>

                                    <FilteredDropdownSearch properties={properties} search={search}/>

                                </ul>
                            </div>

                            <Button onClick={searchByFilter}/>
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