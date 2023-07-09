import React, {useEffect, useRef, useState} from 'react';
import "./homesSearch.scss"
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {PropertyStatus} from "../../types/PropertyStatus";
import {FilterBar, PropertyList} from "../../components";
import {getProperty, Pagination} from "../../http/propertyAPI";

import { Outlet } from "react-router-dom"
import {Toaster} from "react-hot-toast";
import {PropertySearch} from "../../types/PropertySearch";
import {Property} from "../../types/Property";
import {setFilterSearch} from "../../store/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useMutation, useQueryClient} from "@tanstack/react-query";
function HomesSearch() {

    const dispatch = useDispatch()
    const location = useLocation();
    const {status} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);

    const { itemsPerPage, currentPage } = useSelector(
        (state: RootState) => state.pagination
    );


    const searchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(searchParams.entries());


    const [properties, setProperties] = useState<Property[]>();


    const [propertyParams, setPropertyParams] = useState<PropertySearch>({property_status: undefined, property_type: undefined, baths: undefined, beds: undefined, sort: undefined, city: undefined, state_province: undefined})
    const propertyRef = useRef(propertyParams)
    const paginationRef = useRef<Pagination>({page: 1, limit: 12})


    const property_types = searchParams.get('property_types') || undefined;

    const beds = searchParams.get('beds');
    const baths = searchParams.get('baths');
    const sortBy = searchParams.get('sort') || undefined;

    const city = searchParams.get('city') || undefined;
    const state_province = searchParams.get('state') || undefined;
    const max = searchParams.get('max');
    const min = searchParams.get('min');

    const page = searchParams.get('page');


    const [propertiesLength, setPropertiesLength] = useState<Property[]>([])
    const queryClient = useQueryClient();

    const propertyMutation = useMutation({
        mutationFn: getProperty,
        onSuccess: (data) => {
            setProperties(data)
            setLoading(false)
            // setPropertiesLength(data)
            queryClient.invalidateQueries({ queryKey: ['properties'] })
        },
    })



    useEffect(() => {


        if (status){

            if (Object.values(PropertyStatus).includes(status as PropertyStatus)){
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

                paginationRef.current.page = typeof page === "string" ? parseInt(page): null

                setPropertyParams(propertyRef.current)


                getProperty({property_params: propertyRef.current, pagination: paginationRef.current}).then((properties) => {
                    setProperties(properties)
                    setLoading(false)


                }).catch((error) => {
                    console.log(error)

                })


                // propertyMutation.mutate({property_params: propertyRef.current, pagination: paginationRef.current})


                getProperty({property_params: propertyRef.current}).then((properties) => {
                    setPropertiesLength(properties)

                }).catch((error) => {
                    console.log(error)

                })

            }

            else{
                navigate("/")
            }
        }
    }, [status, property_types, beds, baths, sortBy, city, state_province, min, max, page]);



    useEffect(() => {
        dispatch(setFilterSearch(propertyRef.current))

    }, [propertyRef]);





    return (
        <div className="properties">
            <div className="container">
                <div className="info">

                    <h4 className="title">Search for an offer</h4>

                    <p className="description">
                        Choose from the most advantageous offers
                    </p>

                </div>

                <FilterBar/>

                <PropertyList properties={properties} loading={loading} propertiesLength={propertiesLength.length}/>
            </div>


        </div>
    );
}

export default HomesSearch;