
import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from '../views/LandingPage'

function App() {
    return (
            <div>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/signup" component={() => { return <LandingPage page='signup' /> }} />
                <Route exact path="/login" component={() => { return <LandingPage page='login'/> }} />

            </Switch>
            </div>
    );
}

export default App;