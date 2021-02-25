import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Solicitud } from './Solicitud';

export const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([])
    const [hospitales, setHospitales] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/solicitud")
            .then(response => setSolicitudes(response.data.filter(solicitud => solicitud.estado !== "Cerrada")))
        
        axios.get("http://localhost:5000/hospital")
            .then(response => setHospitales(response.data))
    }, [])

    const nombreHospital = (id) => {
        const hospital = hospitales.filter(hospital => hospital._id === id)
        return hospital[0].nombre
    }

    return(
        hospitales.length > 0 ?
        <Container>
            <Grid container spacing={4}>
            {solicitudes.map(solicitud => (
                <Grid item xs={12} sm={6} md={4}>
                    <Solicitud solicitud={solicitud} hospital={nombreHospital(solicitud.hospital)} />
                </Grid>
            ))}
            </Grid>
        </Container> : null
    )
}