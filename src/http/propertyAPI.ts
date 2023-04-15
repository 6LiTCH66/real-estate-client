import {Property} from "../types/Property";
import axios from "axios"


export interface PropertyList{
    properties: Property[]
}

export const getProperty = async (): Promise<Property[]> => {
    try{
        const propertiesAPI = await axios.get<PropertyList>(`${process.env.REACT_APP_BASE_URL}/property/properties`)
        // console.log(propertiesAPI.data.properties)

        return propertiesAPI.data.properties

    }catch (err){
        console.error(err)
        throw err;
    }
}

export const oneProperty = async (id: string):Promise<Property> =>{
    try{
        const property = await axios.get<Property>(`${process.env.REACT_APP_BASE_URL}/property/single/${id}`)
        return property.data

    }catch (err) {
        console.log(err)
        throw err;
    }
}

