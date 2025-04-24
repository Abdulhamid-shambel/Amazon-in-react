import React from 'react';
import classes from './header.module.css'
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader';
import amazonLogo from './images/amazon_logo.png'
import flag from "./images/Flag_of_the_United_States.svg.png";
import { Link } from 'react-router-dom';

function Header() {

 

  return (
    <div className={classes.fixed}>
      <section className={classes.header_container}>
        {/* left side */}

        <div className={classes.logo_container}>
          {/* amazon logo */}
          <Link to="/">
            <img
              src={amazonLogo}
              alt="amazon logo"
            />
          </Link>

          {/* delivery */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/*middle side  */}

        <div className={classes.search}>
          {/* search bar */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="search product" />
          {/* search icon */}
          <BsSearch size={25} />
        </div>

        {/* right side */}

        <div className={classes.order_container}>
          <Link to="" className={classes.language}>
            <img
              src={flag}
              alt=""
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>
          <Link to="/auth">
            <div>
              <p>Sign In</p>
              <span>Account & Lists</span>
            </div>
          </Link>

          {/* orders */}
          <Link to="/orders">
            <p>returns</p>
            <span>& orders</span>
          </Link>

          {/* cart */}

          <Link to='/cart' className={classes.cart}>
            <BiCart size={35}/>
            <span>0</span>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </div>
  );
}

export default Header