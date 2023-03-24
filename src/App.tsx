import React from 'react';
import './App.scss';
import {Navbar, Header, TopOffers} from "./components";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Header/>
        <TopOffers/>
    </div>
  );
}

export default App;
