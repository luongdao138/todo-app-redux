import React from 'react';
import Filter from './components/filter';
import Todos from './components/todos';

function App() {
  return (
    <div className='App container '>
      <h1 className='app-title text-center'>My todo app</h1>
      <Filter />
      <Todos />
    </div>
  );
}

export default App;
