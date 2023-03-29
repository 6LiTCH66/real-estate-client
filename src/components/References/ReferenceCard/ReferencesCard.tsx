import React, {createRef, forwardRef, useEffect, useRef, useState} from 'react';
import "./referenceCard.scss";


interface ChildProps{
    handleData: (data: number) => void;
}
function ReferencesCard ({handleData}: ChildProps)  {
    const divRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {

        if (divRef.current) {
            setHeight(divRef.current.offsetHeight)
        }
        const handleResize = () => {
            if (divRef.current) {
                setHeight(divRef.current.offsetHeight)
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [divRef]);

    useEffect(() => {
        handleData(height);

    }, [height]);



    return (
        <div className="reference-card" ref={divRef}>
            <div className="body">
                <p className="quotes">
                    “
                </p>
                <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem. Erat proin in posuere dui accumsan lorem. Diam nunc scelerisque mi vestibulum scelerisque mi ac nisi. Dictumst nunc placerat ultricies pretium.
                </p>
            </div>

            <div className="card-footer">
                <h6 className="name">Jocelyn Stanton</h6>
                <p className="place">2 bedroom apartmentt in Barcelona</p>

            </div>

        </div>
    );
}

export default ReferencesCard;