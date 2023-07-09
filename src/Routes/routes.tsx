import {Route, Routes} from "react-router-dom";
import {HomePage, HomesSearch, PropertyDetails, Favourites} from "../pages";
import {PropertyList} from "../components";
import PrivateRoute from "./PrivateRoute";
import AddHome from "../pages/AddHome/AddHome";


export default () => (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="*" element={<HomePage/>}/>


        <Route path="homes/:status" element={<HomesSearch/>}/>
        <Route path="property-detail/:propertyId" element={<PropertyDetails/>}/>

        <Route path="favourites" element={
                <PrivateRoute>
                        <Favourites/>
                </PrivateRoute>
        }/>
            <Route path="/add-home" element={<AddHome/>}/>
    </Routes>
)