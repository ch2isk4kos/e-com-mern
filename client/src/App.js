import React from 'react';
import Landing from './components/Landing';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={Landing} />
        <Route exact path={'/home'} component={Home} />
      </Switch>
    </div>
  );
}

export default App;
