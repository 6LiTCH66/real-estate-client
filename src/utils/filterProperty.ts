import {Property, PropertyHeader} from "../components/Header/Header";


export const filterProperty = (properties: PropertyHeader[], search: string, searchBy?: "state" | "city") => {

    const uniqueProperties = properties.filter(
        (value, index, self) => self.findIndex((v) => v.city === value.city) === index
    );

    const uniquePropertiesStates = properties.filter(
        (value, index, self) => self.findIndex((v) => v.state === value.state) === index
    );

    switch (searchBy){
        case "state":
            return uniquePropertiesStates.filter((property) => {
                return property.state.toLowerCase().includes(search.toLowerCase()) || !search
            })
    }


    return uniqueProperties.filter((property) => {
        return property.city.toLowerCase().includes(search.toLowerCase()) || property.state.toLowerCase().includes(search.toLowerCase()) || !search
    })
}