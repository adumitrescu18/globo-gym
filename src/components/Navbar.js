import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarData } from './NavbarData';
import './Navbar.css';

function Navbar() {
  return (
    <div className='navbar' style={{flexWrap: "nowrap"}}>
        <ul className='nav-bar-items'>
            {NavbarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{margin: 0}}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
        <form className="nav-bar-search">
          <input class="form-control mr-sm-2" type="search" placeholder="Potential Hazard" aria-label="Search" style={{height: "5vh"}}></input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ height: "5vh"}}>Search</button>
        </form>
    </div>
  );
}

export default Navbar;