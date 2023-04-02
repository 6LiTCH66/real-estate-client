import React, {FC, useEffect, createRef} from 'react';
import "./selectDropdown.scss"
import {useDispatch} from "react-redux";
import {reset} from "../../../store/dropdownSlice";
import {SelectDropdownProps} from "../../../types/SelectDropdownProps";


const SelectDropdown:FC<SelectDropdownProps> = React.memo(({styles, children}) => {
    const wrapperRef = createRef<HTMLUListElement>();

    const dispatch = useDispatch();

    const handleResetClick = () => {
        dispatch(reset());
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                if (wrapperRef.current.style.display === "block"){
                    console.log(wrapperRef.current.style.display)
                    handleResetClick()
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);






    return (
        <ul className={`select-dropdown`} style={styles} ref={wrapperRef}>
            {children}
        </ul>
    );
})

export default SelectDropdown;