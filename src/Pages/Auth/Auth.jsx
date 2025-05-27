import React, { useContext, useState } from "react";
import classes from "./auth.module.css";
import AmazonLogo from "./image/Amazon_logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../utility/action.type";
import {ClipLoader} from "react-spinners";


function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  // console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    // Check if the user is signing up or signing in
    if (e.target.name === "signIn") {
      // Sign in user
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // Signed in
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      // Sign up user
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // Signed up
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.auth_container}>
      <Link to="/">
        <img src={AmazonLogo} alt="Amazon Logo" className={classes.logo} />
      </Link>

      <div className={classes.form_container}>
        <h1>Sign-In</h1>
        {
          navStateData?.state?.msg && (
            <small className={classes.error}>
              {navStateData.state.msg}
            </small>
          )
        }
        <form>
          <div className={classes.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            onClick={authHandler}
            type="submit"
            name="signIn"
            className={classes.signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p className={classes.terms_and_conditions}>
          By signing-in you agree to the <span>AMAZON FAKE CLONE</span>{" "}
          Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice.
        </p>
        <button
          onClick={authHandler}
          type="submit"
          name="signUp"
          className={classes.createAccountButton}
        >
          {loading.signUp ? <ClipLoader color="#000" size={15} /> : "Create your Amazon account"}
          
        </button>
        {error && <small className={classes.error}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
