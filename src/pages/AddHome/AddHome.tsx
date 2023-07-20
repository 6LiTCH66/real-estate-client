import React, {FormEvent, useState} from 'react';
import "./addHome.scss"
import InputField from "../../components/UI/InputField/InputField";
import {propertyStatus, propertyTypes} from "../../components/FilterBar/FilterBar";
import {SelectButton, SelectDropdown} from "../../components/UI";
import {setPage} from "../../store/paginationSlice";
import {handleCheck} from "../../utils/getSelectedProperties";
import {PropertyJSON} from "../../types/Property";
import {PropertyType} from "../../types/PropertyType";
import {PropertyStatus} from "../../types/PropertyStatus";
import {addProperty} from "../../http/propertyAPI";
import TextAreaInput from "../../components/UI/TextAreaInput/TextAreaInput";
function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}
function AddHome() {
    const [showPropertyType, setShowPropertyType] = useState<boolean>(false)
    const [showPropertyStatus, setShowPropertyStatus] = useState<boolean>(false)
    const [selectedPropertyType, setSelectedPropertyType] = useState<string>("")
    const [selectedPropertyStatus, setSelectedPropertyStatus] = useState<string>("")
    const [property, setProperty] = useState<PropertyJSON>({} as PropertyJSON)
    const [images, setImages] = useState<FileList | null>(null);


    const handleAddPropertyForm = async (event: FormEvent) => {
        event.preventDefault()

        const formData = new FormData();

        for (const key in property) {
            formData.append(key, property[key as keyof PropertyJSON].toString());
        }

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
        const res = await addProperty(formData)

        console.log(res)

    }

    return (
        <div className="add-home">

            <form onSubmit={handleAddPropertyForm} className="add-property-container">

                <div className="property-info-wrapper">

                    <h4 className="block-title">Property Location Information</h4>

                    <InputField
                        type={"text"}
                        required={true}
                        className={"property-add-input"}
                        id={"country-name"}
                        placeholder={"Enter country"}
                        onChange={(event) => {
                            setProperty({...property, country: event.target.value})
                        }}
                        label={
                        <label htmlFor="country-name">Country name</label>
                    }/>

                    <div className="property-container-info">

                        <InputField
                            type={"text"}
                            required={true}
                            className={"property-add-input"}
                            id={"address-name"}
                            placeholder={"Enter address"}
                            onChange={(event) => {
                                setProperty({...property, address: event.target.value})
                            }}
                            label={
                            <label htmlFor="address-name">Address name</label>
                        }/>

                        <InputField
                            type={"text"}
                            required={true}
                            className={"property-add-input"}
                            id={"state-name"}
                            placeholder={"Enter state"}
                            onChange={(event) => {
                                setProperty({...property, state_province: event.target.value})
                            }}
                            label={
                            <label htmlFor="state-name">State name</label>
                        }/>


                    </div>

                    <div className="property-container-info">
                        <InputField
                            type={"text"}
                            required={true}
                            className={"property-add-input"}
                            id={"city-name"}
                            placeholder={"Enter city"}
                            onChange={(event) => {
                                setProperty({...property, city: event.target.value})
                            }}
                            label={
                            <label htmlFor="city-name">City name</label>
                        }/>

                        <InputField
                            type={"number"}
                            required={true}
                            className={"property-add-input"}
                            id={"zipcode-number"}
                            placeholder={"Enter zipcode"}
                            onChange={(event) => {
                                setProperty({...property, zipcode: parseInt(event.target.value)})
                            }}
                            label={
                            <label htmlFor="zipcode-number">Zipcode</label>
                        }/>

                    </div>
                </div>


                <div className="property-info-wrapper">
                    <h4 className="block-title">Property Information</h4>

                    <div className="property-container-info">
                        <InputField
                            type={"number"}
                            required={true}
                            id={"bedrooms-number"}
                            className={"property-add-input"}
                            placeholder={"Enter bedrooms number"}
                            onChange={(event) => {
                                setProperty({...property, bedrooms: parseInt(event.target.value)})
                            }}
                            label={
                            <label htmlFor="bedrooms-number">Bedrooms number</label>
                        }/>

                        <InputField
                            type={"number"}
                            required={true}
                            id={"bathrooms-number"}
                            className={"property-add-input"}
                            placeholder={"Enter bathrooms number"}
                            onChange={(event) => {
                                setProperty({...property, bathrooms: parseInt(event.target.value)})
                            }}
                            label={
                            <label htmlFor="bathrooms-number">Bathrooms number</label>
                        }/>
                    </div>

                    <div className="property-container-info">
                        <InputField
                            type={"number"}
                            required={true}
                            id={"square-footage"}
                            className={"property-add-input"}
                            placeholder={"Enter square footage"}
                            onChange={(event) => {
                                setProperty({...property, square_footage: parseInt(event.target.value)})
                            }}
                            label={
                            <label htmlFor="square-footage">Square footage</label>
                        }/>

                        <InputField
                            type={"number"}
                            required={true}
                            id={"price-per-sqft"}
                            className={"property-add-input"}
                            placeholder={"Enter price per sqft"}
                            onChange={(event) => {
                                setProperty({...property, pricePerSqft: parseInt(event.target.value)})
                            }}
                            label={
                            <label htmlFor="price-per-sqft">Price per sqft</label>
                        }/>
                    </div>

                    <div className="property-container-info">


                        <div className="input-wrapper">
                            <label htmlFor="property-type">Property type</label>

                            <SelectButton title={!selectedPropertyType ? "Select Property Type" : selectedPropertyType}
                                          onClick={() => setShowPropertyType(prevState => !prevState)}
                                          disable={false}
                                          className={`property-add-btn ${selectedPropertyType ? "set-selected-color" : ''}`}/>

                            <SelectDropdown styles={{display: showPropertyType ? "block" : "none"}} className={`property-add-dropdown`}>

                                {propertyTypes.map((type, index) => (
                                    <li key={index}>
                                        <input type="radio"
                                               id={type}
                                               value={type}
                                               checked={selectedPropertyType === type}
                                               onChange={(event) => {
                                                   setSelectedPropertyType(event.target.value)
                                                   setProperty({...property, property_type: event.target.value as PropertyType})

                                               }}
                                               onClick={(event) => {
                                                   setShowPropertyType(false)
                                               }}
                                               />

                                        <label htmlFor={type}>{type}</label>
                                    </li>
                                ))}

                            </SelectDropdown>
                        </div>


                        <div className="input-wrapper">
                            <label htmlFor="property-status">Property type</label>

                            <SelectButton title={!selectedPropertyStatus ? "Select Property Status" : selectedPropertyStatus}
                                          onClick={() => setShowPropertyStatus(prevState => !prevState)}
                                          disable={false}
                                          className={`property-add-btn ${selectedPropertyStatus ? 'set-selected-color' : ''}`}/>

                            <SelectDropdown styles={{display: showPropertyStatus ? "block" : "none"}} className={"property-add-dropdown"}>

                                {propertyStatus.slice(1, propertyStatus.length).map((type, index) => (
                                    <li key={index}>
                                        <input type="radio"
                                               id={type}
                                               value={type}
                                               checked={selectedPropertyStatus === type}
                                               onChange={(event) => {
                                                   setSelectedPropertyStatus(event.target.value)

                                                   setProperty({...property,
                                                       property_status: event.target.value === "For Sale" ? "sell" : "rent"})
                                               }}
                                               onClick={(event) => {
                                                   setShowPropertyStatus(false)
                                               }}
                                        />

                                        <label htmlFor={type}>{type}</label>
                                    </li>
                                ))}

                            </SelectDropdown>
                        </div>


                    </div>


                    <div className="property-container-info">
                        <InputField
                            type={"number"}
                            required={true}
                            className={"property-add-input"}
                            id={'build-year'}
                            placeholder={"Enter build year"}
                            onChange={(event) => {
                                setProperty({...property, build_year: parseInt(event.target.value)})
                            }}
                            label={
                            <label htmlFor="build-year">Build year</label>
                        }/>


                        <InputField
                            type={"number"}
                            required={true}
                            id={"price-number"}
                            className={"property-add-input"}
                            placeholder={"Enter price"}
                            onChange={(event) => {
                                setProperty({...property, price: parseInt(event.target.value)})
                            }}
                            label={

                            <label htmlFor="price-number">Price</label>
                        }/>
                    </div>

                    <InputField
                        type={"number"}
                        required={true}
                        id={"garage-amount"}
                        className={"property-add-input"}
                        placeholder={"Enter garage amount"}
                        onChange={(event) => {
                            setProperty({...property, garage: parseInt(event.target.value)})
                        }}
                        label={
                        <label htmlFor="garage-amount">Garage amount</label>
                    }/>

                </div>

                <div className="property-info-wrapper">
                    <h4 className="block-title">Other Information</h4>


                        <div className="input-container">


                            <TextAreaInput
                                placeholder={"Property description"}
                                name={"property-description"}
                                id={"property-description"}
                                onChange={(event) => {
                                    setProperty({...property, description: event.target.value})
                                }}
                                required={true}
                                label={
                                <label htmlFor="property-description">Property description</label>
                            }/>



                        </div>

                        <InputField
                            type={"file"}
                            multiple={true}
                            required={true}
                            id={"property-images"}
                            placeholder={"Select property images"}
                            onChange={(event) => {
                                if (event.target.files){
                                    setImages(event.target.files)

                                }
                            }}
                            label={
                            <label htmlFor="property-images">Images of property</label>
                        }/>

                </div>

                <div className="submit-btn-container">
                    <button type="submit" className="add-property">Add new property</button>

                </div>


            </form>
        </div>
    );
}

export default AddHome;