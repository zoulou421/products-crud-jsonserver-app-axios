//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Products" element={<Products />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
