import React, {useEffect, useRef, useState} from 'react';
import "./propertyDetails.scss"
import {ContactFrom} from "../../components";
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md"
import {BsCamera} from "react-icons/bs"
import {Favourite} from "../../components";

function PropertyDetails() {
    const [currentPhoto, setCurrentPhoto] = useState<number>(0)
    const sliderRef = useRef<HTMLDivElement>(null);

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



    return (
        <div className="property-details">
            <div className="container">
                <div className="main-container">

                    <div className="frame">

                        <div className="image-container">
                            <div className="status">
                                <p>
                                    For Sale
                                </p>
                            </div>
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




                </div>

                <aside>
                    <ContactFrom/>
                </aside>
            </div>
        </div>
    );
}

export default PropertyDetails;