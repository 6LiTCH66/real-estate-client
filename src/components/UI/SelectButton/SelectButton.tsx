import React, {FC} from 'react';
import './selectButton.scss'
import {BsChevronDown} from "react-icons/bs";
import {SelectButtonProps} from "../../../types/SelectButtonProps";


const SelectButton:FC<SelectButtonProps> = ({title, onClick}) => {


    return (
        <button className="filter-input" type="button" onClick={onClick}>

            <span>{title}</span>

            <BsChevronDown size={16} className="arrow-down"/>


        </button>
    );
}

export default SelectButton;