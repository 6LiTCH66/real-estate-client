import React from 'react';
import './App.scss';
import { Navbar, Footer, Authentication } from "./components";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/routes"
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "./store/userSlice";
import {UserAuthentication} from "./types/UserAuthentication";
import {Toaster} from "react-hot-toast";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const userJSON = localStorage.getItem("user");
        const user: UserAuthentication | null = userJSON ? JSON.parse(userJSON) as UserAuthentication : null;


        if (user){

            dispatch(setUser(user))

        }

    }, []);

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
