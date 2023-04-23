import React from 'react';
import './navbar.scss'
import logo from "../../assets/logo.svg";
import {FiMenu} from "react-icons/fi"
import {useState} from "react";
import {RiCloseLine} from "react-icons/ri"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import {toggleModal} from "../../store/modalSlice";
import { useDispatch } from 'react-redux';
import {RootState} from "../../store/store";
import {useSelector} from "react-redux";
import {logout} from "../../http/userAPI";
import {signout} from "../../store/userSlice";
import toast from "react-hot-toast";

function Navbar() {
    const [toggle, setToggle] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser, isAuth } = useSelector(
        (state: RootState) => state.userSlice
    );

    const { favourites } = useSelector(
        (state: RootState) => state.favouriteSlice
    );

    const handleLogout = () => {
        logout()
        dispatch(signout())
        toast.success("You've been logged out successfully!")
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
                       <li>
                           <Link to="/homes/buy">Buy</Link>
                       </li>

                       <li>
                           <Link to="/homes/rent">Rent</Link>
                       </li>

                       <li>
                           <a href="#references">References</a>
                       </li>

                       <li>
                           <a href="#about-us">About us</a>
                       </li>
                       <li>

                           <a href="#our-team">Our team</a>
                       </li>
                       {isAuth ? (
                           <li className="favourites-link">
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