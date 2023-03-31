import React, {useState} from 'react';
import "./filterBar.scss";
import {Button} from "../UI";
import {BsChevronDown} from "react-icons/bs";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";

function FilterBar() {
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)
    const [max, setMax] = useState<number>();
    const [min, setMin] = useState<number>();


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

                    <button className="filter-input" type="button" onClick={() => setOpenDropDown(prevState => !prevState)}>
                                <span>
                                    For Sale
                                </span>
                        <BsChevronDown size={16} className="arrow-down"/>
                    </button>

                    <button className="filter-input" type="button" onClick={() => setOpenDropDown(prevState => !prevState)}>
                                <span>
                                    Home Type
                                </span>
                        <BsChevronDown size={16} className="arrow-down"/>
                    </button>

                    <button className="filter-input" type="button" onClick={() => setOpenDropDown(prevState => !prevState)}>
                                <span>
                                    Beds & Baths
                                </span>
                        <BsChevronDown size={16} className="arrow-down"/>
                    </button>

                    <button className="filter-input" type="button" onClick={() => setOpenDropDown(prevState => !prevState)}>
                                <span>
                                    Most expensive
                                </span>
                        <BsChevronDown size={16} className="arrow-down"/>
                    </button>

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