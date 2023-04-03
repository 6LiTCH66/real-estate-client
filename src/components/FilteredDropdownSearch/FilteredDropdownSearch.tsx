import React, {FC} from 'react';
import "./filteredDropdownSearch.scss"
import {Property} from "../Header/Header";
import {filterProperty} from "../../utils/filterProperty";
import {boldify} from "../../utils/boldify";


const FilteredDropdownSearch:FC<{properties: Property[], search: string}> = ({properties, search}) =>  {
    return (
        <>
            {
                filterProperty(properties, search).length > 0 ? (
                    filterProperty(properties, search).map((property, index) => (
                        <li key={index}>
                            <a href="#">{boldify(property.city, search)}, {property.state}</a>
                        </li>
                    ))
                ): (
                    <li>
                        <a href="#">City not found</a>
                    </li>
                )
            }
        </>
    );
}

export default FilteredDropdownSearch;