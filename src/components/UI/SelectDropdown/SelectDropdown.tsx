import React, {FC, useEffect, useRef} from 'react';
import "./selectDropdown.scss"
import {useDispatch} from "react-redux";
import {SelectDropdownProps} from "../../../types/SelectDropdownProps";
import {reset} from "../../../store/dropdownSlice";

// add field shouldHandleOutsideClick to the interface

const SelectDropdown:FC<SelectDropdownProps> = ({currentButton, styles, children}) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLUListElement>(null);

    // const handleClickOutside = useCallback((event: MouseEvent) => {
    //     if (ref.current && !ref.current.contains(event.target as Node)) {
    //         if (ref.current.style.display === "block") {
    //             ref.current.style.display = "none";
    //             dispatch(reset());
    //         }
    //     }
    // }, [dispatch]);
    //
    // useOnClickOutside(ref, handleClickOutside);




    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {

            if (currentButton){
                if (ref.current && !ref.current?.contains(event.target as Node)) {

                    if (ref.current?.style.display === "block"){
                        ref.current!.style!.display = "none"
                        dispatch(reset())
                    }


                }
            }


        };

        if (currentButton){
            document.addEventListener("mousedown", handleClickOutside);

        }


        return () => {
            if (currentButton){
                document.removeEventListener("mousedown", handleClickOutside);

            }

        };
    }, [ref]);


    return (
        <ul className={`select-dropdown`} id={currentButton} style={styles} ref={ref}>
            {children}
        </ul>
    );
}

export default SelectDropdown;