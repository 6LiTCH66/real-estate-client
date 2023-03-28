import React from 'react';
import "./ourTeam.scss"
import TeamCard from "../TeamCard/TeamCard";

function OurTeam() {
    return (
        <div className="team">
            <div className="container">
                <div className="team-cards">

                    <div className="team-text_card">
                        <p className="team-title">
                            Our Team
                        </p>
                        <p className="team-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus rutrum donec ultricies cras id ac.
                        </p>
                    </div>

                    <TeamCard/>
                    <TeamCard/>
                    <TeamCard/>
                    <TeamCard/>
                    <TeamCard/>

                </div>
            </div>
        </div>
    );
}

export default OurTeam;