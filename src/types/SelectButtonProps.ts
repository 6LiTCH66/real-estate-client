import React from "react";

export interface SelectButtonProps{
    title: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disable: boolean,
    className?: string,
    styles?: React.CSSProperties
}