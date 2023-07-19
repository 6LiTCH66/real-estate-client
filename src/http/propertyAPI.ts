import {Property} from "../types/Property";
import axios, {AxiosRequestConfig} from "axios"
import {PropertySearch} from "../types/PropertySearch";



export interface PropertyList{
    properties: Property[]
}


export interface Pagination{
    page?: number | null;
    limit?: number | null;
}

export const getProperty = async ({property_params, pagination}: { property_params?: PropertySearch; pagination?: Pagination; }): Promise<Property[]> => {

    const config: AxiosRequestConfig = {
        params: { ...property_params, ...pagination }
    };

    try{
        const propertiesAPI = await axios.get<PropertyList>(`${process.env.REACT_APP_BASE_URL}/property/properties`, config)
        return propertiesAPI.data.properties

    }catch (err){
        console.error(err)
        throw err;
    }
}

export const oneProperty = async (id: string): Promise<Property> =>{
    try{
        const property = await axios.get<Property>(`${process.env.REACT_APP_BASE_URL}/property/single/${id}`)
        return property.data

    }catch (err) {
        console.log(err)
        throw err;
    }
}

export const addProperty = async (formData: FormData) => {
    try{
        const property = await axios.post<Property>(`${process.env.REACT_APP_BASE_URL}/property/add-property`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return property.data

    }catch (err){
        console.log(err)
        throw err;
    }
}

