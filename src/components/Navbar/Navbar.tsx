import React from 'react';
import './navbar.scss'
import logo from "../../assets/logo.svg";
import {FiMenu} from "react-icons/fi"
import {useState, useEffect} from "react";
import {RiCloseLine} from "react-icons/ri"

function Navbar() {
    const [toggle, setToggle] = useState<boolean>(false);
    useEffect(() => {
        console.log(toggle)
    }, [toggle])
    return (
        <div className="navbar">
           <div className="container">

               <div className="logo">
                   <img src={logo} alt="Logo"/>
               </div>

               <FiMenu size={40} className="burger" onClick={() => setToggle(prevState => !prevState)}/>


               <div className="menu" id={toggle ? "toggle": ""}>

                   <RiCloseLine size={40} className="close" onClick={() => setToggle(prevState => !prevState)}/>
                   <ul>
                       <li>
                           <a href="/">Buy</a>
                       </li>

                       <li>
                           <a href="/">Rent</a>
                       </li>

                       <li>
                           <a href="/">References</a>
                       </li>

                       <li>
                           <a href="/">About us</a>
                       </li>
                       <li>
                           <a href="/">Our team</a>
                       </li>

                   </ul>

                   <div className="signIn">
                       <a href="/" >Sing in</a>
                   </div>
               </div>

           </div>
        </div>
    );
}

export default Navbar;