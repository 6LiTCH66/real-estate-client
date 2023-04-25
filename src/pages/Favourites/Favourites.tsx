import React, {useRef, useState} from 'react';
import "./Favourites.scss"
import {PropertyList} from "../../components";

import {useEffect} from "react";
import {getFavourites} from "../../http/userAPI";
import {Property} from "../../types/Property";
import {useSelector, useDispatch} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchFavourites} from "../../store/favouriteSlice";

function Favourites() {
    const [favouriteProperties, setFavouriteProperties] = useState<Property[]>()

    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(true)

    const { favourites, status } = useSelector(
        (state: RootState) => state.favouriteSlice
    );


    useEffect(() => {
        dispatch(fetchFavourites())


    }, [dispatch]);


    useEffect(() => {

        if (status === "succeeded" && favourites){

            setFavouriteProperties(favourites.map((favourite) => favourite.propertyId))
            setLoading(false)
        }else{
            setLoading(true)
        }



    }, [favourites]);


    return (
        <div className="favourites">
            <div className="favourites-container">
                <div className="favourites-info">

                    <h4 className="title">Your favourites properties</h4>
                </div>
                <PropertyList properties={favouriteProperties} loading={loading} propertiesLength={favouriteProperties?.length}/>

            </div>
        </div>
    );
}

export default Favourites;