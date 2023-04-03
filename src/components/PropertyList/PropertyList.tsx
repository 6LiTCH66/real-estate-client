import React, {useEffect, useRef, useState} from 'react';
import "./propertyList.scss"
import {PropertyCard} from "../index";
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md"

function PropertyList() {
    const totalProperties = 18; // Property[].length
    const itemsPerPage = 12 // property to display per page

    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(totalProperties / itemsPerPage);




    const handleClickPrev = () => {
        setCurrentPage(prevState => prevState - 1)
    };

    const handleClickNext = () => {
        setCurrentPage(prevState => prevState + 1)
    };

    const handleClickPage = (index: number) => {
        setCurrentPage(index)
    }

    const propertiesArray: number[] = Array(totalProperties).fill(0);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = propertiesArray.slice(start, end);


    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    }, [currentPage]);





    return (
        <div className="property-list">
            <div className="list-container">

                {paginatedItems.map((_, index) => (
                    <PropertyCard key={index} myKey={index}/>
                ))}


                <div className="pagination">

                    <ul>
                        <li>
                            <button onClick={handleClickPrev} disabled={currentPage === 1}>
                                <MdNavigateBefore size={30}/>
                            </button>
                        </li>
                        {Array(totalPages).fill(0).map((_, index) => (
                            <li key={index}>
                                <button
                                    style={{backgroundColor: currentPage === index + 1 ? "#091638" : "",
                                        color: currentPage === index + 1 ? "#FFFFFF" : ""}} onClick={() => handleClickPage(index + 1)}>

                                    {index + 1}

                                </button>
                            </li>
                        ))}
                        {totalPages > 5 ? (
                            <>
                                <li className="pagination-dots">
                                    <div className="dots">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>

                                    </div>
                                </li>

                                <li>
                                    <button>{totalProperties}</button>
                                </li>
                            </>

                        ): (<></>)
                        }



                        <li>
                            <button onClick={handleClickNext} disabled={currentPage === totalPages}>
                                <MdNavigateNext size={30}/>
                            </button>
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    );
}

export default PropertyList;