import React, {FC, useEffect, useState} from 'react';
import "./filteredDropdownSearch.scss"
import {Property, PropertyHeader} from "../Header/Header";
import { filterProperty } from "../../utils/filterProperty";
import { boldify } from "../../utils/boldify";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom"
import { FilterSearch } from "../../types/FilterSearch";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setShowDropdown} from "../../store/fliterDropdown";
import {useDispatch} from "react-redux";


const FilteredDropdownSearch: FC<FilterSearch> = ({ properties, search, selected_properties }) => {
    const history = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch()

    const {status} = useParams()

    const { property_search } = useSelector(
        (state: RootState) => state.search
    );

    const preventClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }
    const onSearchItemClick = (event: React.MouseEvent<HTMLAnchorElement>, searchProperty: string, params: "city" | "state" | "all") => {
        event.preventDefault()

        dispatch(setShowDropdown(false))
        const newSearch = new URLSearchParams(location.search);

        if (searchProperty.split(",").length > 1){

            const [city, state] = searchProperty.split(",")
            newSearch.set("city", city)
            newSearch.set("state", state)
        }

        if (search && params !== "all"){
            newSearch.set(params, searchProperty);

        }

        if (selected_properties){
            newSearch.set("property_types", selected_properties.toString())
        }

        switch (params){
            case "city":
                newSearch.delete("state")
                break
            case "state":
                newSearch.delete("city")
                break

        }

        history(`/homes/${!status ? "any": status}?${newSearch}`)


    }




    return (
        <>
            {
                filterProperty(properties, search).length > 0 ? (
                    <>

                    {filterProperty(properties, search).map((property, index) => (
                            <div key={index}>
                                <li>
                                    <Link to="" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onSearchItemClick(event, `${property.city},${property.state}`, "all")}>{boldify(property.city, search)}, {boldify(property.state, search)}</Link>
                                </li>

                            </div>

                    ))}
                    {filterProperty(properties, search, "state").map((property, index) => (
                        <div key={index}>
                            <li>
                                <Link to="" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => onSearchItemClick(event, `${property.state}`, "state")}>{boldify(property.state, search)}</Link>
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