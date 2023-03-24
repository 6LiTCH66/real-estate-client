import React, {useState} from 'react';
import "./propertyCard.scss"
function PropertyCard() {
    const [price, setPrice] = useState<number>(3290000)
    const [sqft, setSqft] = useState<number>(1200)

    return (
        <div className="card">
            <div className="container">
                <div className="image">
                    <img src="https://photos.zillowstatic.com/fp/f6a50baf44ca9e011448f5bf228c7794-cc_ft_960.jpg" alt=""/>
                </div>
                <div className="body">

                    <p className="price">${price.toLocaleString()}</p>
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
                    </div>
                    <address>2679 Syracuse Court, Denver, Colorado 80238</address>

                    <hr/>
                    <div className="footer">
                        <div className="image-wrapper">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYxcol9EhezDIhNK3QE-8N_2NsI5gH3zgkOQxlGs-TyCIsEK30Acavt8l11q9vldk0wA&usqp=CAU" alt=""/>
                        </div>
                        <p>Olivia Johnson</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PropertyCard;