import React, {FC, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import toast from "react-hot-toast";
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

    const { currentUser, isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );


    useEffect(() => {

        if (!isLoading && !isAuthenticated) {

            navigate("/", { state: { from: location } });

        }

        if (isAuthenticated && user){
            appDispatch(setUser(user))
        }


    }, [navigate, isAuthenticated, isLoading, location]);


    // if (isLoading){
    //     return null;
    // }


    return isAuthenticated ? <>{children}</> : null;
}

export default PrivateRoute;