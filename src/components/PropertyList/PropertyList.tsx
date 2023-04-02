import React from 'react';
import "./propertyList.scss"
import {PropertyCard} from "../index";
import {Link} from "react-router-dom";
import {GrPrevious, GrNext} from "react-icons/gr";
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md"

function PropertyList() {
    return (
        <div className="property-list">
            <div className="list-container">

                {Array(12).fill(0).map((_, index) => (
                    <PropertyCard key={index} myKey={index}/>

                ))}

                <div className="pagination">

                    <ul>
                        <li>
                            <Link to="#">
                                <MdNavigateBefore size={30}/>
                            </Link>
                        </li>
                        {Array(5).fill(0).map((_, index) => (
                            <li key={index}>
                                <Link to="#">{index + 1}</Link>
                            </li>
                        ))}
                        <li>
                            <Link to="#">
                                <MdNavigateNext size={30}/>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default PropertyList;