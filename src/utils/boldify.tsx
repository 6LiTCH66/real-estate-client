import React from "react";

const regexEscape = (str: string) => str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
export const boldify = (targetStr: string, search: string) => {
    return targetStr
        .split(new RegExp(`(${regexEscape(search)})`, "i"))
        .map((part: string, idx: number) =>
            idx % 2 ? (
                <strong key={idx}>{part}</strong>
            ) : (
                <React.Fragment key={idx}>{part}</React.Fragment>
            )
        );
};