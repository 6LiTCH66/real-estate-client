import React from "react";

export const handleCheck = (event: React.ChangeEvent<HTMLInputElement>,setSelectedProperties: React.Dispatch<React.SetStateAction<string[]>>, selectedProperties: string[]): void => {
    let updatedList = [...selectedProperties];
    if (event.target.checked) {
        updatedList = [...selectedProperties, event.target.value];

    } else {
        updatedList.splice(selectedProperties.indexOf(event.target.value), 1);
    }

    setSelectedProperties(updatedList);
};