import React, {FC} from 'react';
import "./selectDropdown.scss"

export interface SelectDropdownProps{
    styles: React.CSSProperties | never,
    children: React.ReactNode
}

const SelectDropdown:FC<SelectDropdownProps> = ({styles, children}) => {



    return (
        <ul className="select-dropdown" style={styles}>
            {children}
        </ul>
    );
}

export default SelectDropdown;