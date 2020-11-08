import React, { Component } from 'react';
import Cronometro from './components/Cronometro';

class App extends Component{
  render(){
    return (
      <>
        <h1 className='title' >Cronometro App</h1>
        <Cronometro />
      </>
    );
  }
}

export default App;
