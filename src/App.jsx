import React, { useContext, useEffect } from 'react'
import './App.css'
import Routing from './Router'
import { DataContext } from './Components/DataProvider/DataProvider';
import { Type } from './utility/action.type';
import { auth } from './utility/firebase';


function App() {

  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      if (auth) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    })

  }, [dispatch]);

  return (
    <>
      <Routing />
    </>
  )
}

export default App
