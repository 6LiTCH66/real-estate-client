import React, {useEffect, useRef, useState} from 'react';
import "./references.scss"
import ReferencesCard from "./ReferenceCard/ReferencesCard";
function References() {
    const [height, setHeight] = useState<number>(280);

    const handleData = (data: number) => {
        if (data > 0){
            setHeight(data)

        }
    }


    const [currentIndex, setCurrentIndex] = useState(0);

    const cardsArray = [1, 2, 3, 4]

    const slideRight = () => {
        if (currentIndex < cardsArray.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }else{
            setCurrentIndex(0)
        }
    };



    useEffect(() => {

        const timeout = setTimeout(() => {
            slideRight()
        }, 5000)

        return () => {
            clearTimeout(timeout);
        }


    }, [currentIndex]);




    return (
        <div className="references">
            <div className="container">
                <h2 className="title">
                    References
                </h2>

                <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus rutrum donec ultricies cras id ac.
                </p>

                <div className="reference-cards" style={{maxHeight: height}}>

                    {cardsArray.map((card, index) => {

                        return (
                            <div key={index} className="cards-container" style={{transform: `translateY(-${currentIndex * 100}%)`}}>
                                <ReferencesCard handleData={handleData}/>
                                <ReferencesCard handleData={handleData}/>
                            </div>
                        )
                    })}

                </div>

                <div className="dots">
                    {cardsArray.map((card, index) => (
                        <div key={index} className="dot" style={{backgroundColor: index === currentIndex ? "#1C3988": ''}}></div>

                    ))}

                </div>

            </div>
        </div>
    );
}

export default References;