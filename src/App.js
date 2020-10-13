import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router';
import { BrowserRouter } from 'react-router-dom';
import { authService } from './fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <div>
        This is the HeraClass Partners Page
    </div>
      <BrowserRouter>
        {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "initializing..."}
      </BrowserRouter>
    </>
  );
}

export default App;
