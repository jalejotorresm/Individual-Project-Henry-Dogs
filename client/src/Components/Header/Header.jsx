import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import SearchBar from './SearchBar/SearchBar';
import './Header.css';
import menu from '../../images/menu.svg';


function Header() {

  const [homeMenu, setHomeMenu] = useState(false)

  function handleClick() {
    setHomeMenu(!homeMenu)
  }

  return(
    <div className="header">
      <div className="header_cont">
        <div className='div_responsive_header'>
          <Link to="/home" className="logo"><h1 className="logo">Henry Dogs</h1></Link>
          <button className='button_header_menu' onClick={handleClick}>
            <img className='menu' src={menu} alt="menu" />
          </button>
        </div>

        <div className={homeMenu  ? "menu_hiden active" : "menu_hiden"}>
          <a href="https://github.com/jalejotorresm/My-PI-Project" target="_balck" className="about_responsive">Mira el codigo fuente aqui</a>
        </div>

        <div className="nav">
          <a href="https://github.com/jalejotorresm/My-PI-Project" target="_balck" className="about">Mira el codigo fuente aqui</a>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Header;