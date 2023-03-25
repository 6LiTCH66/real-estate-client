import React, {useState} from 'react';
import "./propertyCard.scss"
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai"

function PropertyCard() {
    const [price, setPrice] = useState<number>(3290000)
    const [sqft, setSqft] = useState<number>(1200)
    const [favouriteClick, setFavouriteClick] = useState<boolean>(false)


    return (
        <div className="card">
            <div className="container">
                <div className="image">
                    <div className="status">
                        <p>
                            For Sale
                        </p>
                    </div>
                    <img src="https://photos.zillowstatic.com/fp/f6a50baf44ca9e011448f5bf228c7794-cc_ft_960.jpg" alt=""/>
                    <div className="favourite" onClick={() => setFavouriteClick(prevState => !prevState)}>
                        <AiFillHeart size={27} color={favouriteClick ? '#E83845' : '#141B2D'}/>
                    </div>
                </div>
                <div className="body">

                    <p className="price">${price.toLocaleString()}</p>
                    <address>2679 Syracuse Court, Denver, Colorado 80238</address>

                    <div className="data">
                        <p>
                            <strong>3</strong> bed
                        </p>
                        <p>
                            <strong>2</strong> bath
                        </p>
                        <p>
                            <strong>{sqft.toLocaleString()}</strong> sqft
                        </p>
                        <p>
                            Apartment
                        </p>


                    </div>
                </div>

            </div>
        </div>
    );
}

export default PropertyCard;