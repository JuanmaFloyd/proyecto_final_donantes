import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Solicitudes } from '../Solicitudes';
import { Navbar } from '../Navbar/Navbar';
import { Home } from '../Home';

function AuthRoutes(){

    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/solicitudes' component={Solicitudes} /> 
                <Route exact path='/' component={Home} /> 
            </Switch>
        </>
    )
}

export default AuthRoutes;