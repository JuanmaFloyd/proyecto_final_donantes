import React, { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import swal from '@sweetalert/with-react';
import { useHistory } from 'react-router-dom';

export const Auth = (props) => {
    const history = useHistory();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:5000/donante/isAuth", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(() => setAuth(true))
            .catch(() => {
                 history.push("/login");
            })
    })
    
    return(
        <>
            {auth ? props.children : null}
        </>
    )
}