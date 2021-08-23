
import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from '../views/LandingPage'
import ForgotPassword from '../views/auth/ForgotPassword'
import ResetPassword from '../views/auth/ResetPassword'

function App() {
    return (
            <div>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/signup" component={() => { return <LandingPage page='signup' /> }} />
                <Route exact path="/login" component={() => { return <LandingPage page='login' /> }} />
                <Route exact path="/forgot" component={ForgotPassword} />
                <Route exact path="/reset" component={ResetPassword} />
            </Switch>
            </div>
    );
}

export default App;