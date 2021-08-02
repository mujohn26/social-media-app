import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from '../components/HomePage'


const Index = () => {
    return (
        <Switch>
            <Route path="/" eaxt component={HomePage} />
        </Switch>
    );
};

export default Index;
