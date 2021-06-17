import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import ContextProvider from './store/ContextProvider';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(()=>{
    const currentUserInfo=localStorage.getItem('logged');
    if (currentUserInfo==="1"){
      setIsLoggedIn(true)
    }
  }, [] )

  const loginHandler = (eml, pword) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("logged","1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("logged")
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
    <ContextProvider.Provider value={{
      isLoggedIn:isLoggedIn,
      }}>

        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
    </ContextProvider.Provider>
    </React.Fragment>
  );
}

export default App;
