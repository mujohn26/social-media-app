
import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from './HomePage'
import About from './About'

function App() {
    return (
            <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/about" component={About} />

            </Switch>
            </div>
    );
}

export default App;