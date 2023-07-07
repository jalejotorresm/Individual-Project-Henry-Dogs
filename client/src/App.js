import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import DogForm from "./Components/DogForm/DogForm";
import Details from "./Components/Details/Details";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/new" component={DogForm} />
        <Route exact path="/dogDetail/:id" component={Details} />
      </Switch>
    </div>
  );
}

export default App;
