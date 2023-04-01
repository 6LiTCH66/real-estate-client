import React, {useState, useCallback} from 'react';
import "./filterBar.scss";
import {Button, SelectButton, SelectDropdown} from "../UI";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import {ButtonClickedState} from "../../types/ButtonClickedProps";
import {handleCheck} from "../../utils/getSelectedProperties";


function FilterBar() {
    const [max, setMax] = useState<number>();
    const [min, setMin] = useState<number>();
    const [currentCheck, setCurrentCheck] = useState<string>("Property status");
    const [currentSort, setCurrentSort] = useState<string>("Sort");

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

    const propertyTypes: string[] = ["Condo", "Multi Family Home", "Farm", "Single Family Home", "Townhouse", "Apartment", "Land", "Duplex"]
    const sortArray: string[] = ["Price (High to Low)", "Price (Low to High)", "Newest"]


    const propertyStatus = ["Any", "For Sale", "For Rent"]

    const [openDropDowns, setOpenDropDowns] = useState<ButtonClickedState>({
        statusButton: false,
        typeButton: false,
        bedsBathsButton: false,
        sortButton: false
    });


    const handleButtonClick = (buttonName: keyof ButtonClickedState) => {

        setOpenDropDowns((prevState) => ({
            ...prevState,
            [buttonName]: !openDropDowns[buttonName],
        }));
    }


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

                        <SelectDropdown styles={{display: openDropDowns["statusButton"] ? "block" : "none"}}>


                            {propertyStatus.map((property, index) => (

                                <li key={index}>
                                    <input type="radio" id={property} checked={property === currentCheck} onChange={(event) => setCurrentCheck(event.target.id)} readOnly={true}/>
                                    <label htmlFor={property}>{property}</label>
                                </li>

                            ))}



                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title={selectedProperties.length ? selectedProperties.toString() : "Home Type"} onClick={() => handleButtonClick('typeButton')}/>

                        <SelectDropdown styles={{display: openDropDowns["typeButton"] ? "block" : "none"}} >

                            {propertyTypes.map((type, index) => (
                                <li key={index}>
                                    <input type="checkbox" id={type} value={type} onChange={(event) => handleCheck(event, setSelectedProperties, selectedProperties)}/>
                                    <label htmlFor={type}>{type}</label>
                                </li>
                            ))}

                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title="Beds & Baths" onClick={() => handleButtonClick('bedsBathsButton')}/>

                        <SelectDropdown styles={{width: "115%", display: openDropDowns["bedsBathsButton"] ? "block" : "none"}} >
                            <li className="bedsBaths-container">
                                Beds
                                <ul className="bedsBaths">
                                    {Array(5).fill(0).map((_, index) => (
                                        <li key={index} >
                                            <input type="radio" style={{opacity: "0", position: "absolute"}} id={(index+1).toString()} value={index+1}/>
                                            <label htmlFor={(index+1).toString()}>{index + 1}+</label>
                                        </li>

                                    ))}
                                </ul>
                            </li>
                            <li className="bedsBaths-container">
                                Baths
                                <ul className="bedsBaths">
                                    {Array(5).fill(0).map((_, index) => (
                                        <li key={index} >
                                            <input type="radio" style={{opacity: "0", position: "absolute"}} id={(index+1).toString()} value={index+1}/>
                                            <label htmlFor={(index+1).toString()}>{index + 1}+</label>
                                        </li>

                                    ))}
                                </ul>
                            </li>

                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title={currentSort} onClick={() => handleButtonClick('sortButton')}/>


                        <SelectDropdown styles={{display: openDropDowns["sortButton"] ? "block" : "none"}}>
                            {sortArray.map((sort, index) => (
                                <li key={index}>
                                    <input type="radio" style={{opacity: "0", position: "absolute"}} id={sort} value={sort} onChange={(event) => setCurrentSort(event.target.id)}/>
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