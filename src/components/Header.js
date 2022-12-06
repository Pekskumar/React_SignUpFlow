import React from 'react'
import logo from '../images/logo.png'
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <div className='app-logo'>
        <img className='logo' src={logo} alt="logo" />
      </div>
      <div className='app-right'>
        <p className='signin-text'>{props.text}</p>
        <Link to={props.pageLink}>{props.pageName}</Link>
        
      </div>
    </header>
  )
}

export default Header;