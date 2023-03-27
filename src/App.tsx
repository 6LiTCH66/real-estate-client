import React from 'react';
import './App.scss';
import {Navbar} from "./components";
import {HomePage} from "./pages";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <HomePage/>
    </div>
  );
}

export default App;
