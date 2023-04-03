import React, {useEffect} from 'react';
import "./homesSearch.scss"
import {useParams, useNavigate} from "react-router-dom";
import {PropertyStatus} from "../../types/Property";
import {FilterBar} from "../../components";

import { Outlet } from "react-router-dom"
function HomesSearch() {

    const {status} = useParams();

    const navigate = useNavigate();



    useEffect(() => {

        if (status){

            if (Object.values(PropertyStatus).includes(status as PropertyStatus)){
                // TODO
            }

            else{
                navigate("/")
            }
        }
    }, []);





    return (
        <div className="properties">
            <div className="container">
                <div className="info">

                    <h4 className="title">Search for an offer</h4>

                    <p className="description">
                        Choose from the most advantageous offers
                    </p>

                </div>

                <FilterBar/>

                <Outlet/>

            </div>
        </div>
    );
}

export default HomesSearch;