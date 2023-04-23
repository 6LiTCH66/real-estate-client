import {Route, Routes} from "react-router-dom";
import {HomePage, HomesSearch, PropertyDetails, Favourites} from "../pages";
import {PropertyList} from "../components";


export default () => (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="*" element={<HomePage/>}/>

        {/*<Route path="homes" element={<HomesSearch/>}>*/}
        {/*    <Route path=":status" element={<PropertyList/>}/>*/}
        {/*</Route>*/}

        <Route path="homes/:status" element={<HomesSearch/>}/>
        <Route path="property-detail/:propertyId" element={<PropertyDetails/>}/>
        <Route path="favourites" element={<Favourites/>}/>
    </Routes>
)