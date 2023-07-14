import React, {useEffect, useState} from 'react';
import "./footer.scss"
import footer_logo from "../../assets/footer_logo.svg"
import newsletter from "../../assets/newsletter.svg"
import {useLocation} from "react-router-dom";

function Footer() {

    const [showFooter, setShowFooter] = useState<boolean>(true)

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/messages"){
            setShowFooter(false)
        }else{
            setShowFooter(true)
        }

    }, [location]);

    return (
        <div className="footer" style={{display: !showFooter ? "none": ""}}>
            <div className="container">

                <div className="newsletter">
                    <div className="wrapper">

                        <div className="img-wrapper">
                            <img src={newsletter} alt="Newsletter" />
                        </div>

                        <div className="info">
                            <h4>Subscribe to newsletter</h4>
                            <p>Get the latest news and interesting offers and real estate</p>

                            <div className="form">
                                <input type="email" className="input-email" placeholder="Your e-mail address" />
                                <button type="button" className="subscribe">
                                    <span>Subscribe</span>
                                </button>
                            </div>

                        </div>
                    </div>



                </div>

                <footer>
                    <img src={footer_logo} alt="Logo" />
                    <p>Real Estate</p>
                </footer>
            </div>
        </div>
    );
}

export default Footer;