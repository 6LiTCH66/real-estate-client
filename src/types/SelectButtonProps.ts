import React from "react";

export interface SelectButtonProps{
    title: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}