import React from 'react';
import "./propertyCard.scss"

function PropertyCardSekeleton() {
    return (
        <div className="card">
            <div className="container">
                <div className="image skeleton-box">

                    <div className="status">

                    </div>



                </div>
                <div className="body">

                    <p className="price skeleton-box">

                    </p>
                    <address className="skeleton-box">

                    </address>

                    <div className="data skeleton-box">

                    </div>

                </div>

            </div>
        </div>
    );
}

export default PropertyCardSekeleton;