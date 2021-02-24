import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/solicitud")
            .then(response => setSolicitudes(response.data))
    }, [])

    console.log(solicitudes)

    return(
        <h1>Solicitudes</h1>
    )
}