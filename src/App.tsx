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
import {useLocation} from "react-router-dom";
import {SocketProvider} from "./contexts/SocketContext";

function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, isLoading, user } = useAuthenticatedUser();
    // const location = useLocation();

    useEffect(() => {

        if (user){

            dispatch(setUser(user))

        }

    }, [isAuthenticated, user]);

  return (
      <SocketProvider>
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
      </SocketProvider>

  );
}

export default App;
