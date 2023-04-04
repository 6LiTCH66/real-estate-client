import React, {FC} from 'react';
import {AiFillHeart} from "react-icons/ai";
import './favourite.scss'

interface FavouriteProps{
    isFavourite: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    size: number

}
const FavouriteIcon:FC<FavouriteProps> = ({onClick, isFavourite, size}) => {
    return (
        <div className="favourite" onClick={onClick}>
            <AiFillHeart size={size} color={isFavourite ? '#E83845' : '#141B2D'}/>
        </div>
    );
}

export default FavouriteIcon;