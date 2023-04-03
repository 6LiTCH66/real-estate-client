import React, {FC} from 'react';
import "./filteredDropdownSearch.scss"
import {Property} from "../Header/Header";
import {filterProperty} from "../../utils/filterProperty";
import {boldify} from "../../utils/boldify";
import {Link} from "react-router-dom"
import {FilterSearch} from "../../types/FilterSearch";


const FilteredDropdownSearch:FC<FilterSearch> = ({properties, search}) =>  {
    const preventClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    }

    return (
        <>
            {
                filterProperty(properties, search).length > 0 ? (
                    filterProperty(properties, search).map((property, index) => (
                        <li key={index}>
                            <Link to="#">{boldify(property.city, search)}, {property.state}</Link>
                        </li>
                    ))
                ): (
                    <li>
                        <Link to="" onClick={preventClick}>City not found</Link>
                    </li>
                )
            }
        </>
    );
}

export default FilteredDropdownSearch;