import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AiFillHeart} from "react-icons/ai";
import './favourite.scss'
import {useSelector, useDispatch} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {toggleModal} from "../../../store/modalSlice";
import {checkAuth} from "../../../store/userSlice";
import {getFavourites, addToFavourite, deleteFavourite} from "../../../http/userAPI";
import {Property} from "../../../types/Property";
import toast from 'react-hot-toast';
import {
    addReduxFavourites,
    deleteReduxFavourites,
    fetchFavourites

} from "../../../store/favouriteSlice";

import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading"
import {stat} from "fs";
import app from "../../../App";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser";


interface FavouriteProps{
    size: number
    styles?: React.CSSProperties
    propertyId?: string;
}

export interface Favourite{
    propertyId: Property,
    _id: string,
}

const FavouriteIcon:FC<FavouriteProps> = ({size, styles, propertyId}) => {

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch()

    const [favourite, setFavourite] = useState<boolean>(false)

    const [saveFavourite, setSaveFavourite] = useState<boolean>(false)

    const { currentUser, isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );


    const { favourites, status, isLoading } = useSelector(
        (state: RootState) => state.favouriteSlice
    );

    const favouriteHandler = () => {

        if (isAuth){

            const isFavourite = favourites.some((favourite) => favourite.propertyId._id === propertyId)

            if (propertyId){
                setSaveFavourite(true)

                if (!isFavourite){

                    appDispatch(addReduxFavourites(propertyId)).then(() => {
                        toast.success("Property's been added successfully!")

                        setSaveFavourite(false)
                    })


                }else{

                    appDispatch(deleteReduxFavourites(propertyId)).then(() => {
                        toast.success("Property's been deleted successfully!")
                        setSaveFavourite(false)
                    })


                }
            }
        }else{
            dispatch(toggleModal())
        }
    }



    useEffect(() => {

        if (status === "succeeded"){

            const filterFavourite = favourites.some((favourite) => favourite.propertyId._id === propertyId)

            setFavourite(filterFavourite)

        }

    }, [favourites, saveFavourite]);




    useEffect(() => {

        if (isAuth){

            appDispatch(fetchFavourites())

        }

    }, [appDispatch, favourite, isAuth]);





    return (
        <button className="favourite" onClick={favouriteHandler} disabled={saveFavourite} style={{...styles, cursor: saveFavourite ? "wait" : "pointer"}} >

            {saveFavourite ? (
                <UseAnimations animation={loading} size={size} />

            ) : (
                <AiFillHeart size={size} color={favourite ? '#E83845' : '#141B2D'}/>

            )}

        </button>
    );
}

export default FavouriteIcon;