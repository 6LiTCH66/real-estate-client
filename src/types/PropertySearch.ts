export interface PropertySearch{
    property_status?: string;
    property_type?: string | string[];
    beds?: number | null;
    baths?: number | null;
    sort?: "desc" | "asc" | string,
    city?: string;
    state_province?: string;
    max?: number | null;
    min?: number | null;


}