import React, {useEffect, useRef, useState} from 'react';
import "./propertyDetails.scss"
import {ContactFrom} from "../../components";
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md"
import {BsCamera} from "react-icons/bs"
import {Favourite} from "../../components";


import {AiOutlineHome, AiOutlineCalendar} from "react-icons/ai"
import {IoHammerOutline} from "react-icons/io5"
import {GiHomeGarage} from "react-icons/gi"
import {TfiRulerAlt2} from "react-icons/tfi"
import {MdOutlineGarage} from "react-icons/md"

function PropertyDetails() {
    const [currentPhoto, setCurrentPhoto] = useState<number>(0)
    const sliderRef = useRef<HTMLDivElement>(null);
    const [sqft, setSqft] = useState<number>(1200)

    const imagesArray: string[] = [
        "https://photos.zillowstatic.com/fp/f6a50baf44ca9e011448f5bf228c7794-cc_ft_960.jpg",
        "https://ap.rdcpix.com/16a295e887cf70f9a3a26b8d2f4e4bd6l-m2433874686od-w1024_h768_x2.jpg",
        "https://ap.rdcpix.com/3f98f48678fde975ba32fcdc8c9a5d7dl-m1779328340od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/568f49bc993250f5252e0855d92ecbd5l-m157463490od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",
        "https://ap.rdcpix.com/a64164969bfc1bdd6b6d3665509e53e9l-b1924014928od-w480_h360_x2.jpg",

    ]

    const nextSlide = () => {
        setCurrentPhoto(currentPhoto === imagesArray.length - 1 ? 0 : currentPhoto + 1);
    };

    const prevSlide = () => {
        setCurrentPhoto(currentPhoto === 0 ? imagesArray.length - 1 : currentPhoto - 1);
    };

    const desired = (index: number) => {
        setCurrentPhoto(index)
    }

    useEffect(() => {

        const slider = sliderRef.current;
        const sliderRect = slider?.getBoundingClientRect();
        const sliderWidth = slider?.offsetWidth;

        if (currentPhoto === 0){
            slider!.scrollLeft = 0;
        }

        if(currentPhoto === imagesArray.length - 1){
            slider!.scrollLeft = slider!.scrollWidth - sliderWidth!;
        }

        // check if the next slide is not visible
        const nextSlide = slider?.children[currentPhoto + 1];

        const prevSlide = slider?.children[currentPhoto - 1];


        if (nextSlide) {
            const nextSlideRect = nextSlide.getBoundingClientRect();
            if (nextSlideRect.right > sliderRect!.right) {
                // scroll to make the next slide visible
                slider.scrollLeft += nextSlideRect.right - sliderRect!.right;
            }
        }


        if (prevSlide) {

            const prevSlideRect = prevSlide.getBoundingClientRect();
            if (prevSlideRect.left < sliderRect!.left) {
                // scroll to make the previous slide visible
                slider.scrollLeft -= sliderRect!.left - prevSlideRect.left;
            }
        }



    }, [currentPhoto]);

    const price = 3290000



    return (
        <div className="property-details">
            <div className="container">
                <div className="main-container">

                    <div className="frame">

                        <div className="image-container">



                            <Favourite size={27} isFavourite={false} onClick={() => console.log("zalupa")}/>

                            <button className="left-arrow" onClick={prevSlide}>
                                <MdNavigateBefore size={80} />
                            </button>

                            <div className="image">
                                <img src={imagesArray[currentPhoto]} alt="Property index" loading="lazy"/>

                            </div>

                            <button className="right-arrow" onClick={nextSlide}>
                                <MdNavigateNext size={80} />
                            </button>

                            <div className="photo-total">
                                <BsCamera color="white" size={15}/>
                                <span>{currentPhoto + 1} / {imagesArray.length}</span>
                            </div>
                        </div>

                        <div className="images-slider" ref={sliderRef}>
                            {imagesArray.map((image, index) => (
                                <div className="slide" key={index} onClick={() => desired(index)}>
                                    <img src={image} alt="image" style={{outline: currentPhoto === index ? "4px solid #1C3988": ""}}/>
                                </div>
                            ))}
                        </div>

                    </div>


                    <div className="property-info">
                        <div className="status">
                            <p>
                                For Sale
                            </p>
                        </div>

                        <h2>${price.toLocaleString()}</h2>

                        <div className="data">
                            <p>
                                <strong>3</strong> bed
                            </p>
                            <p>
                                <strong>2</strong> bath
                            </p>
                            <p>
                                <strong>{sqft.toLocaleString()}</strong> sqft
                            </p>

                        </div>


                        <address>
                            2679 Syracuse Court, Denver, Colorado 80238
                        </address>

                        <div className="property-facts">
                            <ul>
                                <li>
                                    {/*Property type*/}
                                    <AiOutlineHome size={25}/>

                                    <div className="facts-info">
                                        <strong>Single family</strong>
                                        <span>Property type</span>
                                    </div>
                                </li>

                                <li>
                                    {/*Time on real-estate.com*/}
                                    <AiOutlineCalendar size={25}/>

                                    <div className="facts-info">
                                        <strong>366 days</strong>
                                        <span>Time on RealEstate.com</span>
                                    </div>
                                </li>

                                <li>

                                    {/*Price per sqft*/}
                                    <TfiRulerAlt2 size={25}/>

                                    <div className="facts-info">
                                        <strong>$128</strong>
                                        <span>Price per sqft</span>
                                    </div>
                                </li>

                                <li>
                                    {/*Garage*/}
                                    <MdOutlineGarage size={25}/>

                                    <div className="facts-info">
                                        <strong>2 cars</strong>
                                        <span>Garage</span>
                                    </div>
                                </li>

                                <li>
                                    {/*Year built*/}
                                    <IoHammerOutline size={25}/>

                                    <div className="facts-info">
                                        <strong>1951</strong>
                                        <span>Year built</span>
                                    </div>
                                </li>
                            </ul>


                            <div className="overview-info">
                                <h6 className="overview-title">Overview</h6>
                                <p className="overview-description">
                                    Welcome to your dream home in the heart of South Denver! This newly remodeled home located at 2059 South Logan Street, Denver, CO is sure to exceed all your expectations.    From the moment you step inside, you'll notice the attention to detail that has been put into every aspect of this home. The open and spacious floor plan is perfect for entertaining and offers plenty of natural light throughout. The living room features large windows, providing the perfect space to unwind after a long day.    The kitchen features stainless steel appliances, gorgeous countertops, and ample cabinet space. The adjacent dining area is the perfect spot for family meals or hosting dinner parties with friends. This home boasts two spacious bedrooms and an updated bathroom, providing plenty of space for everyone to relax and recharge. The large yard is a true oasis, providing plenty of space for outdoor entertaining or simply relaxing in the sun. Located in the highly desirable South Denver neighborhood, this home is just minutes away from restaurants, shopping, and all the best Denver offers. Don't miss out on this incredible opportunity to own a beautifully remodeled home in one of the city's most sought-after areas. Schedule your showing today before its sold!
                                </p>
                            </div>

                        </div>
                    </div>




                </div>

                <aside>
                    <ContactFrom/>
                </aside>
            </div>
        </div>
    );
}

export default PropertyDetails;