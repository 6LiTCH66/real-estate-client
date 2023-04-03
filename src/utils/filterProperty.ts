import {Property} from "../components/Header/Header";


export const filterProperty = (properties: Property[], search: string) => {

    return properties.filter((property) => {
        return property.city.toLowerCase().includes(search.toLowerCase()) || !search
    })
}