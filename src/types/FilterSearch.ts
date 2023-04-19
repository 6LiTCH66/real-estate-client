import {PropertyHeader} from "../components/Header/Header";
import React from "react";
export interface FilterSearch{
    properties: PropertyHeader[],
    search: string,
    setSearch?:  React.Dispatch<React.SetStateAction<string>>
}