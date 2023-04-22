import {PropertyHeader} from "../components/Header/Header";

interface Location {
    city?: string;
    state?: string;
}

export function getSearch(properties: PropertyHeader[], search: string): Location | null {
    const matchingHeader = properties.find(({city, state}) => city.toLowerCase() === search.toLowerCase() || state.toLowerCase() === search.toLowerCase());

    if (matchingHeader) {
        if (matchingHeader.city.toLowerCase() === search.toLowerCase()) {
            return { city: matchingHeader.city };
        } else {
            return { state: matchingHeader.state };
        }
    }

    return null;
}