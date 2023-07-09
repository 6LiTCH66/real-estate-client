import React, {FC} from 'react';
import "./inputField.scss"

interface InputFiledProps{
    type: string,
    value?: string,
    required?: boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    label?: React.ReactNode
    id?: string
    className?: string,
    multiple?: boolean;

}
const InputField:FC<InputFiledProps> = ({type, value, required,multiple, onChange, placeholder, label, id, className}) => {
    return (
        <div className="custom-input-container">
            {label}
            <input className={`custom-input ${className ? className : ""}`} multiple={multiple} type={type} id={id} required={required} value={value} onChange={onChange} placeholder={placeholder}/>

        </div>
    );
}

export default InputField;