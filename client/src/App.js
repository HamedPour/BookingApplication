import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/LandingPage";
import About from "./components/About";
import TopNav from "./components/common/TopNav";

function App() {
  return (
    <Router>
      <div className="App container">
        <TopNav />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
