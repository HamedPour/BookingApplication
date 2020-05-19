import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./views/LandingPage";
import Guests from "./views/Guests";
import TopNav from "./components/common/TopNav";
import Booking from "./views/Booking";

function App() {
  return (
    <Router>
      <div className="App container">
        <TopNav />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/guests" component={Guests} />
          <Route path="/booking" component={Booking} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
