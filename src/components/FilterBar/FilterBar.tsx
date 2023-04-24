import React, {useEffect, useState} from 'react';
import "./filterBar.scss";
import {Button, SelectButton, SelectDropdown} from "../UI";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import {handleCheck} from "../../utils/getSelectedProperties";
import {FilteredDropdownSearch} from "../index";


import { useDispatch, useSelector } from 'react-redux';
import {RootState} from "../../store/store"

import {reset, toggleButton} from "../../store/dropdownSlice";
import {setFilterSearch} from "../../store/searchSlice";
import {setShowDropdown} from "../../store/fliterDropdown";

import {debounce} from "lodash";

import property_json from "../../data/property.json";
import {Property, PropertyHeader} from "../Header/Header";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import qs from "qs";
import {PropertySearch} from "../../types/PropertySearch";
import {getProperty} from "../../http/propertyAPI";
import {getSearch} from "../../utils/getSearch";

function FilterBar() {

    const [searchProperties, setSearchProperties] = useState<PropertySearch>({property_status: "", property_type: "", beds: null, baths: null})
    const location = useLocation()
    const navigate = useNavigate();
    const {status} = useParams()

    const dispatch = useDispatch();
    const { statusButton, typeButton, bedsBathsButton, sortButton } = useSelector(
        (state: RootState) => state.dropDown
    );

    const {showDropDown} = useSelector((state: RootState) => state.filterDropdown)

    const { property_search } = useSelector(
        (state: RootState) => state.search
    );


    const handleButtonClick = (buttonName: string) => {
        dispatch(toggleButton(buttonName));
    };


    const [max, setMax] = useState<number>();
    const [min, setMin] = useState<number>();
    const [currentCheck, setCurrentCheck] = useState<string>("Property status");
    const [currentSort, setCurrentSort] = useState<string>("Sort");
    const [sortBy, setSortBy] = useState<string | null>(null)

    const [beds, setBeds] = useState<number>(0);
    const [baths, setBaths] = useState<number>(0);
    const [propertySearch, setPropertySearch] = useState<PropertyHeader[]>([])

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

    const propertyTypes: string[] = ["Condo", "Multi Family Home", "Farm", "Single Family Home", "Townhouse", "Apartment", "Land", "Duplex"]
    const sortArray: string[] = ["Price (High to Low)", "Price (Low to High)", "Newest"]

    const propertyStatus = ["Any", "For Sale", "For Rent"]

    const [search, setSearch] = useState<string>("");
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get("city") || undefined
    const state = searchParams.get("state") || undefined
    const property_type_params = searchParams.get('property_types');
    // const [showDropDown, setShowDropDown] = useState<boolean>(false)



    const valueSetter = (value: number) => {
        return value
    }

    const debouncedMin = debounce( (value: number) => {
        setMin(valueSetter(value));
    }, 300);

    const debouncedMax = debounce( (value: number) => {
        setMax(valueSetter(value));
    }, 300);



    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     debouncedSearch(event.target.value)
    //
    // }

    const handlePropertyType = (event: React.ChangeEvent) =>{

        setCurrentCheck(event.target.id)
        const property_type = event.target.id
        const search_property_type = property_type === "For Sale" ? "buy" : property_type === "For Rent" ? "rent": "any"

        const params = new URLSearchParams()

        if (selectedProperties.length > 0){
            params.set("property_types", selectedProperties.toString())
        }

        navigate(`/homes/${search_property_type}/?${params}`)

    }

    // if the user changed page set drop down value depending on the page status (buy or sale) and so on
    useEffect(() => {
        const property_type = status === "buy" ? "For Sale" : status === "rent" ? "For Rent": "Any"
        setCurrentCheck(property_type)
    }, [status]);

    useEffect(() => {
        // const newSearch = new URLSearchParams(location.search);

        getProperty({property_status: status === "buy" ? "sell" : status === "any" ? "" : status }).then((properties) => {
            const headers: PropertyHeader[] = properties.map((properties) => {
                const { city, state_province } = properties;

                return { city, state: state_province };
            });

            setPropertySearch(headers)


        }).catch((error) => {
            console.log(error)

        })
    }, [status]);



    // if the user changed page set drop down value depending on the page property types (Duplex, Apartment ....)
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const property_types = searchParams.get('property_types');
        const beds_params = searchParams.get('beds');
        const baths_params = searchParams.get('baths');


        if (property_types){
            setSelectedProperties(property_types.split(","))
        }

        if (beds_params){
            setBeds(parseInt(beds_params))
        }

        if (baths_params){
            setBaths(parseInt(baths_params))
        }

    }, []);



    useEffect(() => {

        const params = new URLSearchParams();


        if (selectedProperties.length > 0){

            params.set("property_types", selectedProperties.toString())
        }


        if (beds){
            params.set("beds", beds.toString())

        }
        if (baths){
            params.set("baths", baths.toString())

        }

        if (sortBy){
            params.set("sort", sortBy)

        }

        if (city){
            params.set("city", city)
            setSearch(city)
        }
        if (state){
            params.set("state", state)
            setSearch(state)

        }
        if (city && state){
            setSearch(`${city}, ${state}`)
        }

        if (min){
            params.set("min", min.toString())
        }

        if (max){
            params.set("max", max.toString())
        }



        if (params.has("property_types") ||
            params.has("beds") ||
            params.has("baths") ||
            params.has("sort") ||
            params.has("city") ||
            params.has("state") ||
            params.has("min") ||
            params.has("max")){

            navigate(`/homes/${status}/?${params}`)

        }else{

            navigate(`/homes/${status}`)
        }




    }, [selectedProperties, status, baths, beds, sortBy, city, state, min, max]);

    // useEffect(() => {
    //
    //
    //
    // }, [min, max])

    const searchButton = () => {
        const newSearch = new URLSearchParams(location.search);

        const searchProperty = getSearch(propertySearch, search)

        if (searchProperty?.state){

            newSearch.set('state', searchProperty.state);
        }

        if (searchProperty?.city){
            newSearch.set('city', searchProperty.city);
        }

        if (searchProperty?.city && searchProperty?.state){

            newSearch.set('city', searchProperty.city);
            newSearch.set('state', searchProperty.state);
        }

        if (newSearch.has("state") || newSearch.has("city")){
            navigate(`/homes/${status}?${newSearch}`)
            dispatch(setShowDropdown(false))

        }

        if (!search){
            navigate(`/homes/${status}`)
            setSearch("")

        }

    }



    return (
        <div className="filterBar">
            <div className="container">

                <div className="search-form">

                    <div className="search-input_wrapper">
                        <input type="text" value={search} placeholder="Enter a keyword" onChange={(event) => {
                            setSearch(event.target.value)
                            dispatch(setShowDropdown(true))

                        }}/>
                        <SelectDropdown styles={{display: search && showDropDown ? "block": "none"}}>

                            <FilteredDropdownSearch properties={propertySearch} search={search}/>

                        </SelectDropdown>
                    </div>
                    <Button onClick={searchButton}/>

                </div>

                <div className="text">
                    <div className="line"></div>
                    <p>Filter settings</p>
                    <div className="line"></div>

                </div>

                <div className="input-container">

                    <div className="input-wrapper">
                        <SelectButton title={currentCheck} onClick={() => handleButtonClick('statusButton')} disable={statusButton}/>

                        <SelectDropdown currentButton="statusButton" styles={{display: statusButton ? "block" : "none"}}>


                            {propertyStatus.map((property, index) => (

                                <li key={index}>
                                    <input type="radio"
                                           id={property}
                                           checked={property === currentCheck}
                                           onChange={handlePropertyType} readOnly={true}/>

                                    <label htmlFor={property}>{property}</label>
                                </li>

                            ))}

                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title={selectedProperties.length ? selectedProperties.toString() : "Home Type"}
                                      onClick={() => handleButtonClick('typeButton')} disable={typeButton}/>

                        <SelectDropdown currentButton="typeButton" styles={{display: typeButton ? "block" : "none"}} >

                            {propertyTypes.map((type, index) => (
                                <li key={index}>
                                    <input type="checkbox"
                                           id={type}
                                           value={type}
                                           checked={selectedProperties.includes(type)}
                                           onChange={(event) => handleCheck(event, setSelectedProperties, selectedProperties)}/>

                                    <label htmlFor={type}>{type}</label>
                                </li>
                            ))}

                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title={`${ beds > 0 ? beds + "+" : ""}
                         Beds & ${baths > 0 ? baths + "+" : ""} Baths`}
                                      onClick={() => handleButtonClick('bedsBathsButton')} disable={bedsBathsButton}/>

                        <SelectDropdown currentButton="bedsBathsButton" styles={{width: "115%", display: bedsBathsButton ? "block" : "none"}} >
                            <li className="bedsBaths-container">
                                Beds
                                <ul className="bedsBaths">
                                    {Array(5).fill(0).map((_, index) => (
                                        <li key={index} >
                                            <input type="radio"
                                                   style={{opacity: "0", position: "absolute"}}
                                                   id={"beds"+(index+1).toString()}
                                                   value={index+1}
                                                   checked={index + 1 === beds}
                                                   onChange={(event) => {

                                                       setBeds(parseInt(event.target.value))
                                                   }}
                                                   onClick={(event) => {
                                                       if (parseInt(event.currentTarget.value) === beds){
                                                           setBeds(0)
                                                       }
                                                   }}
                                            />
                                            <label htmlFor={"beds"+(index+1).toString()}
                                                   style={{backgroundColor: index + 1 === beds ? "#091638": "",
                                                       color: index + 1 === beds ? "#F3F3FA": ""}}>{index + 1}+</label>
                                        </li>

                                    ))}
                                </ul>
                            </li>
                            <li className="bedsBaths-container">
                                Baths
                                <ul className="bedsBaths">
                                    {Array(5).fill(0).map((_, index) => (
                                        <li key={index} >
                                            <input type="radio"
                                                   style={{opacity: "0", position: "absolute"}}
                                                   checked={index + 1 === baths}
                                                   id={"baths"+(index+1).toString()}
                                                   value={index+1}
                                                   onChange={(event) => setBaths(parseInt(event.target.value))}
                                                   onClick={(event) => {
                                                       if (parseInt(event.currentTarget.value) === baths){
                                                           setBaths(0)
                                                       }
                                                   }}
                                            />
                                            <label htmlFor={"baths"+(index+1).toString()}
                                                   style={{backgroundColor: index + 1 === baths ? "#091638": "",
                                                       color: index + 1 === baths ? "#F3F3FA": ""}}>{index + 1}+</label>
                                        </li>

                                    ))}
                                </ul>
                            </li>

                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title={currentSort} onClick={() => handleButtonClick('sortButton')} disable={sortButton}/>


                        <SelectDropdown currentButton="sortButton" styles={{display: sortButton ? "block" : "none"}}>
                            {sortArray.map((sort, index) => (
                                <li key={index}>
                                    <input type="radio"
                                           style={{opacity: "0", position: "absolute"}}
                                           id={sort}
                                           value={sort}
                                           checked={currentSort === sort}
                                           onChange={(event) => {
                                               setSortBy(event.target.id === sortArray[0] ? "desc" : event.target.id === sortArray[1] ? "asc" : null)
                                               setCurrentSort(event.target.id)
                                           }}/>

                                    <label htmlFor={sort}>{sort}</label>
                                </li>
                            ))}

                        </SelectDropdown>
                    </div>



                </div>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <MultiRangeSlider
                        min={0}
                        max={3500000}
                        onChange={({ min, max }) => {
                                debouncedMin(min)
                                debouncedMax(max)

                                // setMax(max)
                                // setMin(min)
                        }
                        }
                    />
                </div>



            </div>
        </div>
    );
}

export default FilterBar;