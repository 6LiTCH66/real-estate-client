import React, {useEffect, useState, useCallback} from 'react';


const useScroll = (scrollRef: React.RefObject<HTMLDivElement>) =>{
    const [scrolledToEnd, setScrollToEnd] = useState<boolean>(false);
    const [scrolledToStart, setScrollToStart] = useState<boolean>(true);

    const handleScroll = useCallback(() => {
        const container = scrollRef.current;

        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            if (scrollLeft >= scrollWidth - clientWidth){
                setScrollToEnd(prevState => !prevState)
            }else{
                setScrollToEnd(false)
            }

            if (scrollLeft === 0){
                setScrollToStart(prevState => !prevState)
            }else{
                setScrollToStart(false)
            }
        }
    }, [scrollRef]);

    useEffect(() => {
        const container = scrollRef?.current;


        if (container) {
            container.addEventListener('scroll', handleScroll);
        }


        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };

    }, [scrollRef, handleScroll])


    return [
        scrolledToEnd,
        scrolledToStart
    ]
}

export default useScroll;