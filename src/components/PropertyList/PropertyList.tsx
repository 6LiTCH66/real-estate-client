import React, {FC, useEffect, useRef, useState} from 'react';
import "./propertyList.scss"
import {PropertyCard, PropertyCardSekeleton} from "../index";
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md"
import {getProperty} from "../../http/propertyAPI";
import {Property} from "../../types/Property";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../store/paginationSlice";
import {RootState} from "../../store/store";
import {Favourite} from "../UI/FavouriteIcon/FavouriteIcon";

interface PropertyListProps{
    properties?: Property[];
    loading: boolean;
    propertiesLength?: number

}

const PropertyList: FC<PropertyListProps> = ({properties, loading, propertiesLength}) => {

    const location = useLocation();
    const dispatch = useDispatch()

    const { itemsPerPage, currentPage } = useSelector(
        (state: RootState) => state.pagination
    );

    const { isLoading } = useSelector(
        (state: RootState) => state.favouriteSlice
    );


    const totalProperties = propertiesLength || 0;

    const totalPages = Math.ceil(totalProperties / itemsPerPage);



    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');

    const handleClickPrev = () => {
        dispatch(setPage(currentPage - 1))
    };

    const handleClickNext = () => {
        dispatch(setPage(currentPage + 1))
    };

    const handleClickPage = (index: number) => {
        dispatch(setPage(index))
    }

    useEffect(() => {

        if (Number(page) > currentPage){
            dispatch(setPage(Number(page)))
        }

    }, [page]);




    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });


    }, [currentPage, page]);







    return (
        <div className="property-list">
            <div className="list-container">
                {!loading ? (
                    properties?.map((property, index) => (
                        <PropertyCard key={index} property={property}/>
                    ))
                ): (
                    Array(12).fill(0).map((_, index) => (
                        <PropertyCardSekeleton key={index}/>
                    ) )
                )}

            </div>
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
    );
}

export default PropertyList;