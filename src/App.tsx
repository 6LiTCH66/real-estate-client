import React, {useLayoutEffect} from 'react';
import './App.scss';
import { Navbar, Footer, Authentication } from "./components";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/routes"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./store/userSlice";
import {UserAuthentication} from "./types/UserAuthentication";
import {Toaster} from "react-hot-toast";
import useAuthenticatedUser from "./hooks/useAuthenticatedUser";

function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, isLoading, user } = useAuthenticatedUser();


    useEffect(() => {

        if (user){

            dispatch(setUser(user))

        }

    }, [isAuthenticated, user]);

  return (
    <div className="App">
        <Authentication/>
      <BrowserRouter>
        <Navbar />
        <Routes />
        <Footer />
      </BrowserRouter>

        <Toaster position="top-right" toastOptions={{

            className: 'notification',

        }}/>

    </div>
  );
}

export default App;
