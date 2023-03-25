import React, {useRef, useState} from 'react';
import "./topOffers.scss"
import {BsArrowRightShort, BsArrowLeftShort} from "react-icons/bs"
import {PropertyCard} from "../index";

function TopOffers() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [scrolledToEnd, setScrollToEnd] = useState<boolean>(false);
    const [scrolledToStart, setScrollToStart] = useState<boolean>(true);

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

    const handleScroll = () => {
        const container = scrollRef.current;
        if (container){
            const { scrollLeft, scrollWidth, clientWidth } = container;
            if (scrollLeft >= scrollWidth - clientWidth){
                setScrollToEnd(prevState => !prevState)
            }else{
                setScrollToEnd(false)
            }

            if (scrollLeft === 0){
                setScrollToStart(prevState => !prevState)
            }else{
                setScrollToStart(false)
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

                    <button type="button" onClick={() => scroll("left")} style={{backgroundColor: scrolledToStart ? "#DADAEE": "", cursor: !scrolledToStart ? "pointer": "default"}}>
                        <BsArrowLeftShort color="white" size={42} className="btn-arrow"/>
                    </button>

                    <button type="button" onClick={() => scroll("right")} style={{backgroundColor: scrolledToEnd ? "#DADAEE": "", cursor: !scrolledToEnd ? "pointer": "default"}}>
                        <BsArrowRightShort color="white" size={42} className="btn-arrow"/>
                    </button>
                </div>


                <div className="slider" ref={scrollRef} onScroll={handleScroll}>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                </div>

            </div>
        </div>
    );
}

export default TopOffers;
