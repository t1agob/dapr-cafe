import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
// import { Navbar } from './components/Navbar';
import './App.css';
import { Home } from './pages/Home';
import { Customer } from './pages/Customer';
import { Employee }  from './pages/Employee'

function App() {
  return (    
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
