import React from 'react';
import "./topOffers.scss"
import {BsArrowRightShort, BsArrowLeftShort} from "react-icons/bs"
import {PropertyCard} from "../index";

function TopOffers() {
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

                    <button>
                        <BsArrowLeftShort color="white" size={42} className="btn-arrow"/>
                    </button>

                    <button>
                        <BsArrowRightShort color="white" size={42} className="btn-arrow"/>
                    </button>
                </div>


                <div className="slider">
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>
                    <PropertyCard/>


                    {/*<div className="card">*/}

                    {/*</div>*/}

                    {/*<div className="card">*/}

                    {/*</div>*/}

                    {/*<div className="card">*/}

                    {/*</div>*/}

                    {/*<div className="card">*/}

                    {/*</div>*/}

                    {/*<div className="card">*/}

                    {/*</div>*/}

                    {/*<div className="card">*/}

                    {/*</div>*/}
                </div>

            </div>
        </div>
    );
}

export default TopOffers;
