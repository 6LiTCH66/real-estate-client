import React from 'react';
import './navbar.scss'
import logo from "../../assets/logo.svg";
import {FiMenu} from "react-icons/fi"
import {useState} from "react";
import {RiCloseLine} from "react-icons/ri"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Navbar() {
    const [toggle, setToggle] = useState<boolean>(false);
    const navigate = useNavigate();

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

                   </ul>

                   <div className="signIn">
                       <Link to="/sing-in">Sing in</Link>
                   </div>
               </div>

           </div>
        </div>
    );
}

export default Navbar;