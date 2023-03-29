import React from 'react';
import "./referenceCard.scss";



function ReferencesCard ()  {
    return (
        <div className="reference-card">
            <div className="body">
                <p className="quotes">
                    “
                </p>
                <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem. Erat proin in posuere dui accumsan lorem. Diam nunc scelerisque mi vestibulum scelerisque mi ac nisi. Dictumst nunc placerat ultricies pretium.
                </p>
            </div>

            <div className="card-footer">
                <h6 className="name">Jocelyn Stanton</h6>
                <p className="place">2 bedroom apartmentt in Barcelona</p>

            </div>

        </div>
    );
}

export default ReferencesCard;