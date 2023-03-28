import React from 'react';
import "./teamCard.scss"

function TeamCard() {
    return (
        <div className="team-card">
            <div className="image-wrapper">
                <img src="https://torontolife.com/wp-content/uploads/2020/08/Tom-Storey-The-Storey-Team-Real-Estate-800x603.png" alt=""/>
            </div>

            <div className="info">
                <p className="realtor_name">
                    Davis Carder
                </p>

                <p className="realtor_description">
                    Super duper position
                </p>

            </div>

        </div>
    );
}

export default TeamCard;