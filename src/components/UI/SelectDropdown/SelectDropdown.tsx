import React, {FC, useEffect, useRef, useState, useCallback} from 'react';
import "./selectDropdown.scss"

export interface SelectDropdownProps{
    styles: React.CSSProperties | never,
    children: React.ReactNode,

}

const SelectDropdown:FC<SelectDropdownProps> = ({styles, children}) => {
    const wrapperRef = useRef<HTMLUListElement>(null);


    return (
        <ul className="select-dropdown" style={styles} ref={wrapperRef}>
            {children}
        </ul>
    );
}

export default SelectDropdown;