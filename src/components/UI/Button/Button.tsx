import React from 'react';
import "./button.scss"
import {AiOutlineSearch} from "react-icons/ai";
import {ButtonProps} from "../../../types/ButtonClickProps";

function Button({onClick}: ButtonProps) {
    return (
        <button type="button" className="search" onClick={onClick}>
            <AiOutlineSearch size={25} className="search-icon"/>
            <span>Search</span>
        </button>
    );
}

export default Button;