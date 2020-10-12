import React from 'react';
import AppRouter from './components/Router';

function App() {
  return (
    <>
      <div>
        This is the HeraClass Partners Page
    </div>
      <AppRouter isLoggedIn={false} userObj={{ username: 'tester' }} />
    </>
  );
}

export default App;
