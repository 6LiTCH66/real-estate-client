import React, {FC} from 'react';
import "./textAreaInput.scss"

interface TextAreaInputProps{
    value?: string,
    required?: boolean,
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder: string,
    label?: React.ReactNode
    id?: string
    className?: string,
    name?: string,

}

const TextAreaInput:FC<TextAreaInputProps> = ({name, value, required, label, onChange, className, placeholder, id}) => {
    return (
        <>
            {label}
            <textarea
                required={required}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`custom-text-area-input ${className ? className : ''}`}
            >

        </textarea>
        </>

    );
}

export default TextAreaInput;