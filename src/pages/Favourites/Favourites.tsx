import React, {useMemo, useRef, useState} from 'react';
import "./Favourites.scss"
import {PropertyList} from "../../components";

import {useEffect} from "react";
import {getFavourites, getUser} from "../../http/userAPI";
import {Property} from "../../types/Property";
import {useSelector, useDispatch} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {fetchFavourites, setFavouriteLoading} from "../../store/favouriteSlice";
import {useNavigate} from "react-router-dom";

function Favourites() {
    const [favouriteProperties, setFavouriteProperties] = useState<Property[]>()

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const { favourites, status, isLoading } = useSelector(
        (state: RootState) => state.favouriteSlice
    );

    const { isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );

    const [loading, setLoading] = useState<boolean>(true)



    useEffect(() => {
        dispatch(fetchFavourites())


    }, [dispatch]);



    useEffect(() => {

        setLoading(status === "loading")

    }, [favouriteProperties]);


    useEffect(() => {


        if (status === "succeeded"){
            setFavouriteProperties(favourites.map((favourite) => favourite.propertyId))

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