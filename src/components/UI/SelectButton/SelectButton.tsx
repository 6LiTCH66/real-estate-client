import React, {FC} from 'react';
import './selectButton.scss'
import {BsChevronDown} from "react-icons/bs";
import {SelectButtonProps} from "../../../types/SelectButtonProps";


const SelectButton:FC<SelectButtonProps> = ({title, onClick, disable, className}) => {


    return (
        <button className={`filter-input ${className ? className : ''}`} type="button" onClick={onClick} disabled={disable}>

            <span className="filter-title">{title}</span>

            <BsChevronDown size={16} color="#141B2D"/>


        </button>
    );
}

export default SelectButton;