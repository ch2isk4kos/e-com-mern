import React from "react";
import Header from "./components/nav/Header";
import Landing from "./components/Landing";
import Home from "./components/Home";
import { Switch, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={"/"} component={Landing} />
        <Route exact path={"/home"} component={Home} />
      </Switch>
    </div>
  );
};

export default App;
