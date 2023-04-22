import React, {useEffect, useRef, useState} from 'react';
import "./propertyList.scss"
import {PropertyCard, PropertyCardSekeleton} from "../index";
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md"
import {getProperty} from "../../http/propertyAPI";
import {Property} from "../../types/Property";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {PropertySearch} from "../../types/PropertySearch";
import {setFilterSearch} from "../../store/searchSlice";

function PropertyList() {

    const location = useLocation();

    const dispatch = useDispatch()
    const [propertyParams, setPropertyParams] = useState<PropertySearch>({property_status: undefined, property_type: undefined, baths: undefined, beds: undefined, sort: undefined, city: undefined, state_province: undefined})
    const propertyRef = useRef(propertyParams)
    const { property_search } = useSelector(
        (state: RootState) => state.search
    );
    const {status} = useParams()

    const [properties, setProperties] = useState<Property[]>();

    const totalProperties = properties?.length || 0; // Property[].length
    const itemsPerPage = 12 // property to display per page

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(true);

    const totalPages = Math.ceil(totalProperties / itemsPerPage);

    const searchParams = new URLSearchParams(location.search);
    const property_types = searchParams.get('property_types') || undefined;

    const beds = searchParams.get('beds');
    const baths = searchParams.get('baths');
    const sortBy = searchParams.get('sort') || undefined;

    const city = searchParams.get('city') || undefined;
    const state_province = searchParams.get('state') || undefined;
    const max = searchParams.get('max');
    const min = searchParams.get('min');


    // check page: sell, rent or any or property_types
    useEffect( () => {

        setLoading(true)

        const propertyStatus = status === "buy" ? "sell" : status === "any" ? "" : status

        propertyRef.current.property_status = propertyStatus

        if (property_types){
            const property_params = property_types.split(",")
            propertyRef.current.property_type = property_params


        }else{
            propertyRef.current.property_type = property_types
        }

        propertyRef.current.beds = typeof beds === "string" ? parseInt(beds): null
        propertyRef.current.baths = typeof baths === "string" ? parseInt(baths): null

        propertyRef.current.sort = sortBy
        propertyRef.current.city = city
        propertyRef.current.state_province = state_province

        propertyRef.current.min = typeof min === "string" ? parseInt(min): null
        propertyRef.current.max = typeof max === "string" ? parseInt(max): null

        setPropertyParams(propertyRef.current)


        getProperty(propertyRef.current).then((properties) => {

            setProperties(properties)
            setLoading(false)


        }).catch((error) => {
            console.log(error)

        })


    }, [status, property_types, beds, baths, sortBy, city, state_province, min, max]);


    useEffect(() => {
        dispatch(setFilterSearch(propertyRef.current))

    }, [propertyRef]);


    const handleClickPrev = () => {
        setCurrentPage(prevState => prevState - 1)
    };

    const handleClickNext = () => {
        setCurrentPage(prevState => prevState + 1)
    };

    const handleClickPage = (index: number) => {
        setCurrentPage(index)
    }


    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = properties?.slice(start, end);


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
                {!loading ? (
                    paginatedItems?.map((property, index) => (
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