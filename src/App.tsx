import React from 'react';
import './App.scss';
import {Navbar, Footer} from "./components";
import {HomePage} from "./pages";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <HomePage/>
        <Footer/>
    </div>
  );
}

export default App;
