import {Property} from "../components/Header/Header";
import React from "react";
export interface FilterSearch{
    properties: Property[],
    search: string,
    setSearch?:  React.Dispatch<React.SetStateAction<string>>
}