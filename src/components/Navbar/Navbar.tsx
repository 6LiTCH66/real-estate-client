import React from 'react';
import './navbar.scss'
import logo from "../../assets/logo.svg";
function Navbar() {
    return (
        <div className="navbar">
           <div className="container">
               <div className="menu">

                   <ul>
                       <li className="logo">
                           <img src={logo} alt="Logo"/>
                       </li>
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