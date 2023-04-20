import React, {FC, useEffect, useState} from 'react';
import "./filteredDropdownSearch.scss"
import {Property, PropertyHeader} from "../Header/Header";
import { filterProperty } from "../../utils/filterProperty";
import { boldify } from "../../utils/boldify";
import {Link, useLocation, useNavigate} from "react-router-dom"
import { FilterSearch } from "../../types/FilterSearch";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";


const FilteredDropdownSearch: FC<FilterSearch> = ({ properties, search }) => {
    const history = useNavigate();
    const location = useLocation()

    const { property_search } = useSelector(
        (state: RootState) => state.search
    );

    const preventClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }
    const onSearchItemClick = (event: React.MouseEvent<HTMLAnchorElement>, searchProperty: string) => {
        console.log("here")
        event.preventDefault()
        const newSearch = new URLSearchParams(location.search);
        if (search){
            newSearch.set('city', searchProperty);

        }

        // if (property_search.property_type){
        //     newSearch.set("type", property_search.property_type);
        //
        // }
        history(`/homes/buy?${newSearch}`)


    }




    return (
        <>
            {
                filterProperty(properties, search).length > 0 ? (
                    <>

                    {filterProperty(properties, search).map((property, index) => (
                            <div key={index}>
                                <li>
                                    <Link to="" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onSearchItemClick(event, `${property.city}, ${property.state}`)}>{boldify(property.city, search)}, {boldify(property.state, search)}</Link>
                                </li>

                            </div>

                    ))}
                    {filterProperty(properties, search, "state").map((property, index) => (
                        <div key={index}>
                            <li>
                                <Link to="" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onSearchItemClick(event, `${property.state}`)}>{boldify(property.state, search)}</Link>
                            </li>

                        </div>

                    ))}
                    </>




                ) : (
                    <li>
                        <Link to="" onClick={preventClick}>City not found</Link>
                    </li>
                )
            }
        </>
    );
}

export default FilteredDropdownSearch;