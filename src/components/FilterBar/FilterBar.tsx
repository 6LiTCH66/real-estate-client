import React, {useState} from 'react';
import "./filterBar.scss";
import {Button, SelectButton, SelectDropdown} from "../UI";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import {handleCheck} from "../../utils/getSelectedProperties";


import { useDispatch, useSelector } from 'react-redux';
import {RootState} from "../../store/store"

import {toggleButton} from "../../store/dropdownSlice";

function FilterBar() {

    const dispatch = useDispatch();
    const { statusButton, typeButton, bedsBathsButton, sortButton } = useSelector(
        (state: RootState) => state.dropDown
    );

    const handleButtonClick = (buttonName: string) => {
        dispatch(toggleButton(buttonName));
    };

    const [max, setMax] = useState<number>();
    const [min, setMin] = useState<number>();
    const [currentCheck, setCurrentCheck] = useState<string>("Property status");
    const [currentSort, setCurrentSort] = useState<string>("Sort");

    const [beds, setBeds] = useState<number>(0);
    const [baths, setBaths] = useState<number>(0);

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

    const propertyTypes: string[] = ["Condo", "Multi Family Home", "Farm", "Single Family Home", "Townhouse", "Apartment", "Land", "Duplex"]
    const sortArray: string[] = ["Price (High to Low)", "Price (Low to High)", "Newest"]

    const propertyStatus = ["Any", "For Sale", "For Rent"]


    return (
        <div className="filterBar">
            <div className="container">
                <div className="search-form">
                    <input type="text" placeholder="Enter a keyword"/>
                    <Button onClick={() => console.log("Hello from filter bar")}/>
                </div>

                <div className="text">
                    <div className="line"></div>
                    <p>Filter settings</p>
                    <div className="line"></div>

                </div>

                <div className="input-container">

                    <div className="input-wrapper">
                        <SelectButton title={currentCheck} onClick={() => handleButtonClick('statusButton')}/>

                        <SelectDropdown styles={{display: statusButton ? "block" : "none"}}>


                            {propertyStatus.map((property, index) => (

                                <li key={index}>
                                    <input type="radio"
                                           id={property}
                                           checked={property === currentCheck}
                                           onChange={(event) => setCurrentCheck(event.target.id)} readOnly={true}/>

                                    <label htmlFor={property}>{property}</label>
                                </li>

                            ))}



                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title={selectedProperties.length ? selectedProperties.toString() : "Home Type"}
                                      onClick={() => handleButtonClick('typeButton')}/>

                        <SelectDropdown styles={{display: typeButton ? "block" : "none"}} >

                            {propertyTypes.map((type, index) => (
                                <li key={index}>
                                    <input type="checkbox"
                                           id={type}
                                           value={type}
                                           onChange={(event) => handleCheck(event, setSelectedProperties, selectedProperties)}/>

                                    <label htmlFor={type}>{type}</label>
                                </li>
                            ))}

                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title={`${ beds > 0 ? beds + "+" : ""} Beds & ${baths > 0 ? baths + "+" : ""} Baths`} onClick={() => handleButtonClick('bedsBathsButton')}/>

                        <SelectDropdown styles={{width: "115%", display: bedsBathsButton ? "block" : "none"}} >
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
                        <SelectButton title={currentSort} onClick={() => handleButtonClick('sortButton')}/>


                        <SelectDropdown styles={{display: sortButton ? "block" : "none"}}>
                            {sortArray.map((sort, index) => (
                                <li key={index}>
                                    <input type="radio"
                                           style={{opacity: "0", position: "absolute"}}
                                           id={sort}
                                           value={sort}
                                           onChange={(event) => setCurrentSort(event.target.id)}/>

                                    <label htmlFor={sort}>{sort}</label>
                                </li>
                            ))}

                        </SelectDropdown>
                    </div>











                </div>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <MultiRangeSlider
                        min={0}
                        max={980000}
                        onChange={({ min, max }) => {
                                setMax(max)
                                setMin(min)
                        }
                        }
                    />
                </div>



            </div>
        </div>
    );
}

export default FilterBar;