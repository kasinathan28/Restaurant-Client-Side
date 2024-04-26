import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './Modules/Index/Index';
import Details from './Modules/details/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='/availablity' element={<Details/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
