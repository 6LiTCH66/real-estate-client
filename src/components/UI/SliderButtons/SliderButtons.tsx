import React, {FC} from 'react';
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";
import "./sliderButtons.scss"

interface SliderButtonsProps{
    styles?: React.CSSProperties,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    scrolledToStart? :boolean,
    scrolledToEnd?: boolean,
}

const RightSliderButton:FC<SliderButtonsProps> = ({styles, onClick, scrolledToEnd}) => {
    return (
        <button className="slider-arrow_button" disabled={scrolledToEnd} type="button" onClick={onClick} style={{backgroundColor: scrolledToEnd ? "#DADAEE": "", cursor: !scrolledToEnd ? "pointer": "default", ...styles}}>
            <BsArrowRightShort color="white" size={42} className="btn-arrow"/>
        </button>
    )
}

const LeftSliderButton:FC<SliderButtonsProps > = ({styles, onClick, scrolledToStart}) => {
    return (
        <button className="slider-arrow_button" disabled={scrolledToStart} type="button" onClick={onClick} style={{backgroundColor: scrolledToStart ? "#DADAEE": "", cursor: !scrolledToStart ? "pointer": "default", ...styles}}>
            <BsArrowLeftShort color="white" size={42} className="btn-arrow"/>
        </button>
    )
}

export {
    RightSliderButton,
    LeftSliderButton
}