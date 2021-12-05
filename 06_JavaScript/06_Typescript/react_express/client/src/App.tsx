import React from 'react';
import logo from './logo.svg';
import './App.css';
import './setupProxy';

function App() {
  fetchAPI();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => fetchAPI()}>
          버튼
        </button>
      </header>
    </div>
  );
}

async function fetchAPI() {
  let response = await fetch('/hello');

  if (response.ok) {
    let result = await response.json();
    console.log(result);
    console.log(result.message)
  }
}

export default App;
