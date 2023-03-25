import React, {useState} from 'react';
import "./propertyCard.scss"
import {AiOutlineHeart} from "react-icons/ai"
import {BsHeart} from "react-icons/bs"
function PropertyCard() {
    const [price, setPrice] = useState<number>(3290000)
    const [sqft, setSqft] = useState<number>(1200)

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
                    <div className="favourite">
                        <AiOutlineHeart size={27}/>
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

                    {/*<hr/>*/}
                    {/*<div className="footer">*/}
                    {/*    <div className="image-wrapper">*/}
                    {/*        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYxcol9EhezDIhNK3QE-8N_2NsI5gH3zgkOQxlGs-TyCIsEK30Acavt8l11q9vldk0wA&usqp=CAU" alt=""/>*/}
                    {/*    </div>*/}
                    {/*    <p>Olivia Johnson</p>*/}
                    {/*</div>*/}
                </div>

            </div>
        </div>
    );
}

export default PropertyCard;