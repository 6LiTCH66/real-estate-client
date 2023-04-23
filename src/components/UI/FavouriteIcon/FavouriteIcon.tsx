import React, {FC, useEffect, useState} from 'react';
import {AiFillHeart} from "react-icons/ai";
import './favourite.scss'
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../../store/store";
import {toggleModal} from "../../../store/modalSlice";
import {checkAuth} from "../../../store/userSlice";
import {getFavourites, addToFavourite, deleteFavourite} from "../../../http/userAPI";
import {Property} from "../../../types/Property";
import toast from 'react-hot-toast';


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

    const [favourite, setFavourite] = useState<boolean>(false)
    const { currentUser, isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );
    const favouriteHandler = () => {

        getFavourites().then((favourite) => {
            const isFavourite = favourite.some((favourite) => favourite.propertyId._id === propertyId)
            // console.log(isFavourite)

            if (propertyId){
                if (!isFavourite){

                    addToFavourite(propertyId).then(() => {
                        setFavourite(true)
                        toast.success("Property's been added successfully!")
                    }).catch((err) => {
                        console.error(err)
                    })


                }else{
                    deleteFavourite(propertyId).then(() => {
                        setFavourite(false)
                        toast.success("Property's been deleted successfully!")
                    }).catch((err) => {
                        console.error(err)
                    })
                }
            }


        }).catch((err) => {
            console.error(err)
        })

        if (isAuth){
            // console.log(propertyId)
            // setIsFavourite(prevState => !prevState)

        }else{
            dispatch(toggleModal())
        }
    }



    useEffect(() => {
        getFavourites().then((favourite) => {
            const fav = favourite.some((favourite) => favourite.propertyId._id === propertyId)
            setFavourite(fav)
        }).catch((err) => {
            console.error(err)
        })

    }, [favourite]);


    return (
        <div className="favourite" onClick={favouriteHandler} style={styles} >
            <AiFillHeart size={size} color={favourite ? '#E83845' : '#141B2D'}/>
        </div>
    );
}

export default FavouriteIcon;