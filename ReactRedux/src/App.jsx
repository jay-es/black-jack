import React from 'react';
import ClassComp from './components/ClassComp';
import HooksComp from './components/HooksComp';
import ClassCont from './containers/ClassCont';
import ReduxHooks from './components/ReduxHooks';

export default function App() {
  return (
    <div>
      <h2 className="title">Class Component</h2>
      <ClassComp />
      <h2 className="title">Hooks Component</h2>
      <HooksComp />
      <h2 className="title">Class Container</h2>
      <ClassCont />
      <h2 className="title">Redux Hooks</h2>
      <ReduxHooks />
    </div>
  );
}
