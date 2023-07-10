import {PropertyType} from "./PropertyType";
import {PropertyStatus} from "./PropertyStatus";

export interface Property{
    _id: string;
    address: string;
    state_province: string;
    city: string;
    country: string;
    description: string;
    build_year: number,
    bedrooms: number;
    bathrooms: number;
    square_footage: number;
    zipcode: number;
    property_type: PropertyType;
    price: number;
    property_status: PropertyStatus,
    images: string[];
    garage: number;
    pricePerSqft: number;
    agentId: string,
    createdAt: Date;

}

export interface PropertyJSON {
    address: string;
    state_province: string;
    city: string;
    country: string;
    description: string;
    build_year: number,
    bedrooms: number;
    bathrooms: number;
    square_footage: number;
    zipcode: number;
    property_type: PropertyType;
    price: number;
    property_status: "sell" | "rent",
    garage: number;
    pricePerSqft: number;
    images: string[]
}