import React, {useEffect} from 'react';
import "./homesSearch.scss"
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {PropertyStatus} from "../../types/PropertyStatus";
import {FilterBar} from "../../components";
import {getProperty} from "../../http/propertyAPI";

import { Outlet } from "react-router-dom"
import {Toaster} from "react-hot-toast";
function HomesSearch() {

    const {status} = useParams();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paramsObj = Object.fromEntries(searchParams.entries());


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
    }, [status]);





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