import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Solicitudes } from '../Solicitudes';
import { Navbar } from '../Navbar/Navbar';
import { Home } from '../Home';
import { Perfil } from '../Perfil';

function AuthRoutes(){

    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/solicitudes' component={Solicitudes} /> 
                <Route exact path='/' component={Home} /> 
                <Route path='/perfil' component={Perfil} /> 
            </Switch>
        </>
    )
}

export default AuthRoutes;