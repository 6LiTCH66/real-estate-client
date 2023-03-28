import React from 'react';
import "./home.scss"
import {Header, TopOffers, AboutUs, OurTeam, References} from "../../components";

function Home() {
    return (
        <>
            <Header/>
            <TopOffers/>
            <AboutUs/>
            <OurTeam/>
            <References/>
        </>
    );
}

export default Home;