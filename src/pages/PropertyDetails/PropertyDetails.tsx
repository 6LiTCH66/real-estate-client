import React, { createRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import "./propertyDetails.scss"
import { ContactFrom } from "../../components";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"
import { BsCamera } from "react-icons/bs"
import { Favourite } from "../../components";

import { AiOutlineHome, AiOutlineCalendar } from "react-icons/ai"
import { IoHammerOutline } from "react-icons/io5"
import { TfiRulerAlt2 } from "react-icons/tfi"
import { MdOutlineGarage } from "react-icons/md"
import { BiBed, BiBath } from "react-icons/bi"
import { SlSizeFullscreen } from "react-icons/sl"
import Geocode from "react-geocode"

import { GoogleMap, Marker, LoadScript, StreetViewPanorama } from "@react-google-maps/api"
import { PropertySlider } from "../../components";

import useScroll from "../../hooks/useScroll";
import { RightSliderButton, LeftSliderButton } from "../../components/UI/SliderButtons/SliderButtons";
import {Property} from "../../types/Property";
import {oneProperty} from "../../http/propertyAPI";
import {PropertyStatus} from "../../types/PropertyStatus";
import {capitalize} from "lodash";
import {useParams} from "react-router-dom";

function PropertyDetails() {
    const {propertyId} = useParams()

    const [property, setProperty] = useState<Property>()

    const [currentPhoto, setCurrentPhoto] = useState<number>(0)
    const sliderRef = useRef<HTMLDivElement>(null);


    const [lat, setLat] = useState<number>();
    const [lng, setLng] = useState<number>();
    const [draggable, setDraggable] = useState<boolean>(false)
    const google_key = process.env.REACT_APP_GOOGLE_KEY;

    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);


    const [scrolledToEnd, scrolledToStart] = useScroll(scrollRef)

    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        oneProperty(propertyId || "").then((property) => {
            setProperty(property)
            setLoading(false)

        }).catch((error) => {
            console.log(error)
        })
    }, [propertyId]);



    const nextSlide = () => {
        setCurrentPhoto(currentPhoto === (property?.images || []).length - 1 ? 0 : currentPhoto + 1);
    };

    const prevSlide = () => {
        setCurrentPhoto(currentPhoto === 0 ? (property?.images || []).length - 1 : currentPhoto - 1);
    };

    const desired = (index: number) => {
        setCurrentPhoto(index)
    }

    useEffect(() => {

        const slider = sliderRef.current;
        const sliderRect = slider?.getBoundingClientRect();
        const sliderWidth = slider?.offsetWidth;

        if (currentPhoto === 0) {
            slider!.scrollLeft = 0;
        }

        if (currentPhoto === (property?.images || []).length - 1) {
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


    Geocode.setApiKey(google_key || "");

    useEffect(() => {
        Geocode.fromAddress('2679 Syracuse Court, Denver, Colorado 80238').then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat)
                setLng(lng)
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);
    const prev = () => {
        const sliderContainer = scrollRef.current;

        if (sliderContainer) {
            const elementWidth = sliderContainer.children[currentSlide - 1];
            elementWidth.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            setCurrentSlide(prev => prev - 1);



        }
    }
    const next = () => {

        const sliderContainer = scrollRef.current;

        if (sliderContainer) {
            const elementWidth = sliderContainer.children[currentSlide + 1];

            elementWidth.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            setCurrentSlide(prev => prev + 1);



        }
    }


    return (
        <div className="property-details">
            <div className="details-container">
                <div className="main-container">

                    <div className="frame">

                        <div className="image-container">
                            <Favourite size={27} isFavourite={false} onClick={() => console.log("test")} />


                            <button className="left-arrow" onClick={prevSlide}>
                                <MdNavigateBefore size={80} />
                            </button>

                            <div className={`image ${loading ? "skeleton-box" : ""}`}>
                                <img src={property?.images[currentPhoto]} alt="Property index" loading="lazy" />

                            </div>

                            <button className="right-arrow" onClick={nextSlide}>
                                <MdNavigateNext size={80} />
                            </button>

                            <div className="photo-total">
                                <BsCamera color="white" size={15} />
                                <span>{currentPhoto + 1} / {property?.images.length}</span>
                            </div>
                        </div>

                        <div className="images-slider" ref={sliderRef}>
                            {(property?.images || Array(4).fill(0)).map((image, index) => (
                                <div className={`slide ${loading ? "skeleton-box" : ""}`} key={index} onClick={() => desired(index)}>
                                    <img  src={image} alt="image" style={{ outline: currentPhoto === index ? "4px solid #1C3988" : "" }} />
                                </div>
                            ))}
                        </div>

                    </div>


                    <div className="property-info">
                        <div className="property-wrapper">


                            <div className={`statusNprice ${loading ? "skeleton-box" : ""}`}>

                                <div className="status">
                                    <p>
                                        For {capitalize(property?.property_status)}
                                    </p>
                                </div>

                                <h2>{property?.property_status === PropertyStatus.Rent ? `$${property.price.toLocaleString()}/month` : `$${property?.price.toLocaleString()}`}</h2>

                            </div>



                            <div className={`data ${loading ? "skeleton-box" : ""}`}>
                                <p>
                                    <BiBed size={20} />
                                    <strong>{property?.bedrooms}</strong> bed
                                </p>
                                <p>
                                    <BiBath size={20} />
                                    <strong>{property?.bathrooms}</strong> bath
                                </p>
                                <p>
                                    <SlSizeFullscreen />
                                    <strong>{property?.square_footage.toLocaleString()}</strong> sqft
                                </p>

                            </div>


                            <address className={loading ? "skeleton-box" : ""} style={{color: loading ? "transparent": ""}}>
                                {`${property?.address}, ${property?.city}, ${property?.state_province} ${property?.zipcode}`}
                            </address>

                            <div className="property-facts">
                                <ul>
                                    <li>
                                        {/*Property type*/}
                                        <AiOutlineHome size={25} />

                                        <div className="facts-info">
                                            <strong className={`${loading ? "skeleton-box" : ""}`}>
                                                {/*Single family*/}
                                                {property?.property_type}
                                            </strong>
                                            <span>Property type</span>
                                        </div>
                                    </li>

                                    <li>
                                        {/*Time on real-estate.com*/}
                                        <AiOutlineCalendar size={25} />

                                        <div className="facts-info">
                                            <strong className={`${loading ? "skeleton-box" : ""}`}>
                                                366 days
                                                {/*{new Date()}*/}
                                            </strong>
                                            <span>Time on RealEstate.com</span>
                                        </div>
                                    </li>

                                    <li>

                                        {/*Price per sqft*/}
                                        <TfiRulerAlt2 size={25} />

                                        <div className="facts-info">
                                            <strong className={`${loading ? "skeleton-box" : ""}`}>
                                                {/*$128*/}
                                                ${property?.pricePerSqft}
                                            </strong>
                                            <span>Price per sqft</span>
                                        </div>
                                    </li>

                                    <li>
                                        {/*Garage*/}
                                        <MdOutlineGarage size={25} />

                                        <div className="facts-info">
                                            <strong className={`${loading ? "skeleton-box" : ""}`}>
                                                {(property?.garage || 0) > 0 ? `${property?.garage} ${(property?.garage || 0) > 1 ? "cars" : "car"}`: `No garage` }
                                            </strong>
                                            <span>Garage</span>
                                        </div>
                                    </li>

                                    <li>
                                        <IoHammerOutline size={25} />

                                        <div className="facts-info">
                                            <strong className={`${loading ? "skeleton-box" : ""}`}>
                                                {property?.build_year}
                                            </strong>
                                            <span>Year built</span>
                                        </div>
                                    </li>
                                </ul>

                            </div>

                        </div>


                    </div>

                    <div className="overview-info ">
                        <h6 className="overview-title">Overview</h6>
                        <p className={`overview-description ${loading ? "skeleton-box" : ""}`}>
                            {/*Welcome to your dream home in the heart of South Denver! This newly remodeled home located at 2059 South Logan Street, Denver, CO is sure to exceed all your expectations.    From the moment you step inside, you'll notice the attention to detail that has been put into every aspect of this home. The open and spacious floor plan is perfect for entertaining and offers plenty of natural light throughout. The living room features large windows, providing the perfect space to unwind after a long day.    The kitchen features stainless steel appliances, gorgeous countertops, and ample cabinet space. The adjacent dining area is the perfect spot for family meals or hosting dinner parties with friends. This home boasts two spacious bedrooms and an updated bathroom, providing plenty of space for everyone to relax and recharge. The large yard is a true oasis, providing plenty of space for outdoor entertaining or simply relaxing in the sun. Located in the highly desirable South Denver neighborhood, this home is just minutes away from restaurants, shopping, and all the best Denver offers. Don't miss out on this incredible opportunity to own a beautifully remodeled home in one of the city's most sought-after areas. Schedule your showing today before its sold!*/}
                            {property?.description}
                        </p>
                    </div>

                    <div className="google-map-container">
                        <h6 className="google-map-title">Location</h6>
                        {(lat && lng) ? (
                            <LoadScript googleMapsApiKey={google_key || ""}>
                                <GoogleMap
                                    center={{ lat: lat, lng: lng }}
                                    zoom={draggable ? 18 : 17}
                                    onClick={() => setDraggable(true)}
                                    mapContainerClassName="google-map"
                                    options={{
                                        panControl: false,
                                        mapTypeControl: false,
                                        zoomControl: false,
                                        fullscreenControl: false,

                                        draggable: draggable,

                                    }}

                                >
                                    <StreetViewPanorama options={{
                                        position: {
                                            lat: lat,
                                            lng: lng,
                                        },
                                        panControl: true,
                                    }} />


                                    <Marker position={{ lat: lat, lng: lng }} />
                                </GoogleMap>
                            </LoadScript>

                        ) : <>Loading...</>}
                    </div>


                </div>

                <aside style={{ width: "100%", flex: "1" }}>
                    <ContactFrom />
                </aside>


            </div>

            <div className="nearBy-properties">

                <h6 className="nearby-title">Nearby homes</h6>
                <PropertySlider styles={{ overflow: "hidden" }} scrollRef={scrollRef} />

                <LeftSliderButton
                    styles={{
                        position: "absolute",
                        left: ".5%",
                        bottom: "39.5%",
                        height: "3rem",
                        width: "3rem",
                    }}
                    scrolledToStart={scrolledToStart} onClick={prev} />

                <RightSliderButton

                    styles={{
                        position: "absolute",
                        bottom: "39.5%",
                        right: ".5%",
                        height: "3rem",
                        width: "3rem",

                    }}
                    scrolledToEnd={scrolledToEnd} onClick={next} />
            </div>


        </div>
    );
}

export default PropertyDetails;