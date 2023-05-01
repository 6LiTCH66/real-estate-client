import React, {useEffect} from 'react';
import "./home.scss"
import {Header, TopOffers, AboutUs, OurTeam, References} from "../../components";
import {useLocation, useNavigate} from "react-router-dom";

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location.hash.substring(1))

    // useEffect(() => {
    //     console.log(location.hash)
    //     navigate(`/${location.hash}`)
    //
    // }, [location.hash]);




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