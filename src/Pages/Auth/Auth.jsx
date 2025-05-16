import React from "react";
import classes from "./auth.module.css";
import AmazonLogo from "./image/Amazon_logo.png";
import { Link } from "react-router-dom";

function Auth() {
  return (
    <section className={classes.auth_container}>
      <Link to="/">
        <img src={AmazonLogo} alt="Amazon Logo" className={classes.logo} />
      </Link>

      <div className={classes.form_container}>
        <h1>Sign-In</h1>
        <form>
          <div className={classes.inputContainer}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>

          <button type="submit" className={classes.signInButton}>
            Sign-In
          </button>
        </form>

        <p className={classes.terms_and_conditions}>
          By signing-in you agree to the <span>AMAZON FAKE CLONE</span>{" "}
          Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice.
        </p>
        <button className={classes.createAccountButton}>
          Create your Amazon account
        </button>
      </div>
    </section>
  );
}

export default Auth;
