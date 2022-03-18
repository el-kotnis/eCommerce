import React, { Fragment } from 'react';
import Search from './Search';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
  return (
  <Fragment>
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to="/">
                        <img src='images/ticofi_logo.png'/>
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">  
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>

                <span id="cart" className="ml-3">Cart<span className="ml-1" id="cart_count">2</span></span>
            </div>
        </nav>
    </Fragment>
  );
};

export default Header;
