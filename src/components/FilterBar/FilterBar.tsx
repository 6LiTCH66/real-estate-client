import React, {useState} from 'react';
import "./filterBar.scss";
import {Button, SelectButton, SelectDropdown} from "../UI";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import {ButtonClickedState} from "../../types/ButtonClickedProps";


function FilterBar() {
    const [max, setMax] = useState<number>();
    const [min, setMin] = useState<number>();

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
                        <SelectButton title="For Sale" onClick={() => handleButtonClick('statusButton')}/>

                        <SelectDropdown styles={{display: openDropDowns["statusButton"] ? "block" : "none"}}>

                            <li>
                                <input type="radio" id="forAny" checked readOnly={true}/>
                                <label htmlFor="forAny">Any</label>
                            </li>

                            <li>
                                <input type="radio" id="forSale" readOnly={true}/>
                                <label htmlFor="forSale">For Sale</label>
                            </li>

                            <li>
                                <input type="radio" id="forRent" readOnly={true}/>
                                <label htmlFor="forRent">For Rent</label>
                            </li>


                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title="Home Type" onClick={() => handleButtonClick('typeButton')}/>

                        <SelectDropdown styles={{display: openDropDowns["typeButton"] ? "block" : "none"}}>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title="Beds & Baths" onClick={() => handleButtonClick('bedsBathsButton')}/>

                        <SelectDropdown styles={{display: openDropDowns["bedsBathsButton"] ? "block" : "none"}}>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                        </SelectDropdown>
                    </div>

                    <div className="input-wrapper">
                        <SelectButton title="Most expensive" onClick={() => handleButtonClick('sortButton')}/>


                        <SelectDropdown styles={{display: openDropDowns["sortButton"] ? "block" : "none"}}>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
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