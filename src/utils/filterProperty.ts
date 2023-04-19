import {Property, PropertyHeader} from "../components/Header/Header";


export const filterProperty = (properties: PropertyHeader[], search: string) => {

    const uniqueProperties = properties.filter(
        (value, index, self) => self.findIndex((v) => v.city === value.city) === index
    );


    return uniqueProperties.filter((property) => {
        return property.city.toLowerCase().includes(search.toLowerCase()) || property.state.toLowerCase().includes(search.toLowerCase()) || !search
    })
}