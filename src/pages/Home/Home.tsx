import React from 'react';
import "./home.scss"
import {Header, TopOffers, AboutUs, OurTeam} from "../../components";

function Home() {
    return (
        <>
            <Header/>
            <TopOffers/>
            <AboutUs/>
            <OurTeam/>
        </>
    );
}

export default Home;