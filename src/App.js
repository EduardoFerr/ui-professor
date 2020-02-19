import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Lista from './componentes/lista';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Route path="/" exact component={Lista}></Route>
        </div>
    </BrowserRouter>
  );
}




export default App;
