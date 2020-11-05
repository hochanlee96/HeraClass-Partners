import React, { useState, useEffect } from 'react';
import AppRouter from './components/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [init, setInit] = useState(false);



  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <>
      <div>
        This is the HeraClass Partners Page
    </div>
      <BrowserRouter>
        {init ? <AppRouter /> : "initializing..."}
      </BrowserRouter>
    </>
  );
}

export default App;
