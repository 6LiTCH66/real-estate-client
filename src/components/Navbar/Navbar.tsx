import React, {useEffect} from 'react';
import './navbar.scss'
import logo from "../../assets/logo.svg";
import {FiMenu} from "react-icons/fi"
import {useState} from "react";
import {RiCloseLine} from "react-icons/ri"
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";



import {toggleModal} from "../../store/modalSlice";
import { useDispatch } from 'react-redux';
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {getFavourites, logout} from "../../http/userAPI";
import {signout} from "../../store/userSlice";
import toast from "react-hot-toast";
import { HashLink } from 'react-router-hash-link';
import {useQuery} from "react-query";
import {fetchFavourites} from "../../store/favouriteSlice";

function Navbar() {
    const [toggle, setToggle] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();

    const location = useLocation();

    const { currentUser, isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );

    const { favourites } = useSelector(
        (state: RootState) => state.favouriteSlice
    );

    useEffect(() => {
        if (currentUser){
            appDispatch(fetchFavourites())
        }

    }, [location]);


    const handleLogout = () => {
        toast.promise(
            logout().then(() => {
                dispatch(signout())
            }),
            {
                loading: 'Logging out...',
                success: "Congratulations on a successful logout!",
                error: "Sorry, an error occurred while trying to log you out.",
            }
        );

    }


    const handleModalWindow = () => {

        dispatch(toggleModal())

    }

    return (
        <div className="navbar">
           <div className="container">

               <div className="logo" onClick={() => navigate("/")}>
                   <img src={logo} alt="Logo"/>
               </div>

               <FiMenu size={40} className="burger" onClick={() => setToggle(prevState => !prevState)}/>


               <div className="menu" data-toggle={toggle ? "toggle" : ""}>

                   <RiCloseLine size={40} className="close" onClick={() => setToggle(prevState => !prevState)}/>
                   <ul>
                       <li onClick={() => setToggle(false)}>
                           <Link to="/homes/buy">Buy</Link>
                       </li>

                       <li onClick={() => setToggle(false)}>
                           <Link to="/homes/rent">Rent</Link>
                       </li>

                       <li onClick={() => setToggle(false)}>
                           <HashLink to="/#references" smooth>References</HashLink>
                       </li>

                       <li onClick={() => setToggle(false)}>
                           <HashLink to="/#about-us" smooth>About us</HashLink>
                       </li>
                       <li onClick={() => setToggle(false)}>

                           <HashLink to="/#our-team" smooth>Our team</HashLink>
                       </li>

                       {isAuth ? (
                           <li className="favourites-link" onClick={() => setToggle(false)}>
                               {favourites.length ? (
                                   <span>{favourites.length}</span>
                               ): (
                                   <></>
                               )}

                               <Link to="/favourites">Favourites</Link>
                           </li>
                       ):  (
                           <></>
                       )}

                       {currentUser.isAgent ? (
                           <li onClick={() => setToggle(false)}>

                               <Link to="/add-home">Add Home</Link>
                           </li>
                       ):(
                           <></>
                       )}

                       {isAuth ? (
                           <li onClick={() => setToggle(false)}>

                               <Link to="/messages">Messages</Link>
                           </li>
                       ):(
                           <></>
                       )}


                   </ul>

                   <div>
                   </div>

                   <div className="signIn" onClick={isAuth ? handleLogout : handleModalWindow}>
                       {isAuth ? (
                           <Link to="#" onClick={(event) => event.preventDefault()}>Logout</Link>

                       ): (
                           <Link to="#" onClick={(event) => event.preventDefault()}>Sing in</Link>

                       )}
                   </div>

               </div>

           </div>
        </div>
    );
}

export default Navbar;