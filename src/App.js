import React from 'react';
import Routes from './routes';
import './App.css';
import TopBar from "./components/topBar";

function App() {
  return (
      <div>
          <TopBar />
        <Routes/>
      </div>
  );
}

export default App;
