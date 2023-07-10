import React, {FC, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import {RootState, useAppDispatch} from "../store/store";
import {setUser} from "../store/userSlice";
import {useSelector} from "react-redux";
interface AuthenticatedProps {
    children: React.ReactNode;
}
const PrivateRoute:FC<AuthenticatedProps> = ({children}) =>  {

    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, isLoading, user } = useAuthenticatedUser();
    const appDispatch = useAppDispatch()


    useEffect(() => {

        if (!isLoading && !isAuthenticated) {

            navigate("/", { state: { from: location } });

        }

        if (isAuthenticated && user){
            appDispatch(setUser(user))
        }

        if (!user?.isAgent && location.pathname === "/add-home"){
            navigate("/", { state: { from: location } });
        }



    }, [navigate, isAuthenticated, isLoading, location]);


    if (isLoading){
        return null;
    }


    return isAuthenticated ? <>{children}</> : null;
}

export default PrivateRoute;