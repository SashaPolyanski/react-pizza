import React, { ChangeEvent } from 'react';

import './scss/app.scss';
import { Header } from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from 'react-router-dom';
import Cart from "./pages/Cart";


function App() {
  const [searchValue, setSearchValue] = React.useState('')
  const setSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  const clearSearchValue = () => {
    setSearchValue('')
  }
  return (
    <div className="App">
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchHandler} clearSearchValue={clearSearchValue}/>

        <Routes>
          <Route path="/" element={<Home searchValue={searchValue}/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>

      </div>
    </div>
  );
}

export default App;
