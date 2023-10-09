import React from 'react';
import './App.css';
import EmailSender from './EmailSender';

function App() {
  return (
    <div className="App">
      <h1>แจ้งปัญหาการใช้สนามกีฬา</h1>
      <EmailSender />
    </div>
  );
}

export default App;
