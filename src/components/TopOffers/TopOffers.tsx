import React, {useRef, useState} from 'react';
import "./topOffers.scss"
import {BsArrowRightShort, BsArrowLeftShort} from "react-icons/bs"
import {PropertySlider} from "../index";
import useScroll from "../../hooks/useScroll";
import {RightSliderButton, LeftSliderButton} from "../UI/SliderButtons/SliderButtons";

function TopOffers() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const [scrolledToEnd, scrolledToStart] = useScroll(scrollRef)

    const scroll = (direction: "left" | "right") => {
        const container = scrollRef.current;

        if(container){
            const scrollWidth = container.scrollWidth

            switch (direction){
                case "left":
                    container.scrollLeft -= scrollWidth / 3
                    break;
                case "right":
                    container.scrollLeft += scrollWidth / 3
                    break;
            }

        }
    }

    return (
        <div className="top-offers">
            <div className="container">
                <div className="wrapper">

                    <div className="info">
                        <p className="title">Top offers</p>
                        <p className="description">Fulfill your career dreams, enjoy all the achievements of the city center and luxury housing to the fullest.</p>
                    </div>

                    <div className="info-button">
                        <button className="show-offers" type="button">
                            <p>
                                Show all offers
                            </p>
                        </button>
                    </div>
                </div>

                <div className="scroll-wrapper">

                    <LeftSliderButton scrolledToStart={scrolledToStart} onClick={() => scroll("left")}/>

                    <RightSliderButton scrolledToEnd={scrolledToEnd} onClick={() => scroll("right")}/>
                </div>

                <PropertySlider scrollRef={scrollRef}/>


            </div>
        </div>
    );
}

export default TopOffers;
