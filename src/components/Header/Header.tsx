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
import {getProperty} from "../../http/propertyAPI";
import {property} from "lodash";
import {getSearch} from "../../utils/getSearch";

export interface Property{
    city: string,
    state: string,
}

export interface PropertyHeader{
    city: string,
    state: string,
}


function Header() {
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)

    const propertyTypes: string[] = Object.values(PropertyType);

    const [properties, setProperties] = useState<PropertyHeader[]>([])

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);


    const [search, setSearch] = useState<string>("");

    const preventClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }

    useEffect(() => {

        getProperty().then((properties) => {

            const headers: PropertyHeader[] = properties.map((properties) => {
                const { city, state_province } = properties;
                return { city, state: state_province};
            });

            setProperties(headers)


        }).catch((error) => {
            console.log(error)

        })

    }, []);



    // type Location = {
    //     city?: string;
    //     state?: string;
    // }
    //
    // function getSearch(): Location | null {
    //     const matchingHeader = properties.find(({city, state}) => city.toLowerCase() === search.toLowerCase() || state.toLowerCase() === search.toLowerCase());
    //
    //     if (matchingHeader) {
    //         if (matchingHeader.city.toLowerCase() === search.toLowerCase()) {
    //             return { city: matchingHeader.city };
    //         } else {
    //             return { state: matchingHeader.state };
    //         }
    //     }
    //
    //     return null;
    // }


    const searchByFilter = () => {
        const newSearch = new URLSearchParams(location.search);


        const searchProperty = getSearch(properties, search)

        if (searchProperty?.state){

            newSearch.set('state', searchProperty.state);
        }

        if (searchProperty?.city){
            newSearch.set('city', searchProperty.city);
        }


        // create redux slice for drop down if the user clicked on drop down

        if (selectedProperties.length){
            newSearch.set("property_types", selectedProperties.toString());

        }
        if (newSearch.has("state") || newSearch.has("property_types") || newSearch.has("city")){
            history(`homes/any?${newSearch}`)

        }else{
            history(`homes/any`)


        }
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

                                    <FilteredDropdownSearch properties={properties} search={search} selected_properties={selectedProperties}/>

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