import React, {useState} from 'react';
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
        if (status === "loading"){
            setLoading(true)

        }
        dispatch(fetchFavourites())

        if (status === "succeeded"){
            setLoading(false)
        }

    }, [dispatch, favouriteProperties]);

    useEffect(() => {

        if (status === "loading"){
            setLoading(true)

        }

        if (status === "succeeded"){
            const favouriteProperties = favourites.map((favourite) => favourite.propertyId)
            setFavouriteProperties(favouriteProperties)
            setLoading(false)

        }




    }, [favourites])


    return (
        <div className="favourites">
            <div className="favourites-container">
                <div className="favourites-info">

                    <h4 className="title">Your favourites properties</h4>
                </div>
                <PropertyList properties={favouriteProperties} loading={loading}/>

            </div>
        </div>
    );
}

export default Favourites;