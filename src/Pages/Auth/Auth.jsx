import React, { useContext, useState } from "react";
import classes from "./auth.module.css";
import AmazonLogo from "./image/Amazon_logo.png";
import { Link } from "react-router-dom";
import { auth } from "../../utility/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [{user}, dispatch] = useContext(DataContext);

  console.log(user)

  const authHandler = async (e) => {  
    e.preventDefault();
    // Check if the user is signing up or signing in
    if (e.target.name === "signIn") {
      // Sign in user
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // Signed in
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });

        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    } else {
      // Sign up user
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // Signed up
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    }
  }

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
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
          </div>

          <button onClick={authHandler} type="submit" name="signIn" className={classes.signInButton}>
            Sign-In
          </button>
        </form>

        <p className={classes.terms_and_conditions}>
          By signing-in you agree to the <span>AMAZON FAKE CLONE</span>{" "}
          Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice.
        </p>
        <button onClick={authHandler} type="submit" name="signUp" className={classes.createAccountButton}>
          Create your Amazon account
        </button>
      </div>
    </section>
  );
}

export default Auth;
