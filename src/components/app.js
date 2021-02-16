import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./home/home";
import Flight from "./flights/flights";
import NoMatch from "./no-match";
import Navigation from "./navigation";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/flights" component={Flight} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
