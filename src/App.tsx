import React from 'react';
import './App.scss';
import { useAuth } from './app/hooks';
import AppRoutes from './routes';
import avatar from "./features/news/assets/monogram.svg";

function App() {
  const auth = useAuth();
  return (
    <div className="App">
      <header className="App-header">
        <span>OUR LOGO</span>
        <div className='mock'></div>
        <div className="user">
          {auth.userData.name}
          <img src={avatar} onClick={() => auth.logOut()} />
        </div>
      </header>
      <AppRoutes />
    </div>
  );
}

export default App;
