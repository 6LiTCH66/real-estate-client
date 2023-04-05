import React from 'react';
import './App.scss';
import {Navbar, Footer} from "./components";
import {BrowserRouter} from "react-router-dom";
import Routes from "./Routes/routes"

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
            <Routes/>
            <Footer/>
        </BrowserRouter>

    </div>
  );
}

export default App;
