import React, {FC, useEffect, LegacyRef} from 'react';
import "./selectDropdown.scss"
import {useDispatch} from "react-redux";
import {SelectDropdownProps} from "../../../types/SelectDropdownProps";
import {reset} from "../../../store/dropdownSlice";



const SelectDropdown = React.forwardRef((props: SelectDropdownProps, ref: LegacyRef<HTMLUListElement>) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {


            if ((ref as React.RefObject<HTMLUListElement>).current && !(ref as React.RefObject<HTMLUListElement>).current?.contains(event.target as Node)) {
                if ((ref as React.RefObject<HTMLUListElement>).current?.style.display === "block"){
                    (ref as React.MutableRefObject<HTMLUListElement>).current!.style!.display = "none"
                    dispatch(reset())
                }


            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <ul className={`select-dropdown`} id={props.currentButton} style={props.styles} ref={ref}>
            {props.children}
        </ul>
    );
})

export default SelectDropdown;