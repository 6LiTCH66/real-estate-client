import {Route, Routes} from "react-router-dom";
import {HomePage, HomesSearch} from "../pages";

export default () => (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="*" element={<HomePage/>}/>
        <Route path="homes/:status" element={<HomesSearch/>}/>
    </Routes>
)