import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Solicitud } from './Solicitud';
import { Spinner } from './Spinner';

export const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState("")
    const [hospitales, setHospitales] = useState("")
    const [donante, setDonante] = useState("")

    useEffect(() => {
        axios.get("http://localhost:5000/donante/info", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(response => setDonante(response.data))
            
        axios.get("http://localhost:5000/solicitud")
            .then(response => setSolicitudes(response.data.docs.filter(solicitud => solicitud.estado !== "Cerrada")))
        
        axios.get("http://localhost:5000/hospital")
            .then(response => setHospitales(response.data.docs))
    }, [])

    const nombreHospital = (id) => {
        const hospital = hospitales.filter(hospital => hospital._id === id)
        return hospital[0].nombre
    }

    const solicitudesPorTipo = () => {
        if (donante.tipoDeSangre === "A+")
            return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "A+" || solicitud.tipoDeSangre ==="AB+"))
        if (donante.tipoDeSangre === "A-")
            return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "A+" || solicitud.tipoDeSangre ==="AB+" || solicitud.tipoDeSangre ==="A-" || solicitud.tipoDeSangre ==="AB-"))
        if (donante.tipoDeSangre === "B+")
            return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "B+" || solicitud.tipoDeSangre ==="AB+"))
        if (donante.tipoDeSangre === "B-")
            return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "B+" || solicitud.tipoDeSangre ==="AB+" || solicitud.tipoDeSangre ==="B-" || solicitud.tipoDeSangre ==="AB-"))
        if (donante.tipoDeSangre === "AB+")
            return solicitudes.filter(solicitud => (solicitud.tipoDeSangre ==="AB+"))
        if (donante.tipoDeSangre === "AB-")
            return solicitudes.filter(solicitud => (solicitud.tipoDeSangre ==="AB+" || solicitud.tipoDeSangre ==="AB-"))
        if (donante.tipoDeSangre === "0+")
            return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "A+" || solicitud.tipoDeSangre ==="AB+" || solicitud.tipoDeSangre ==="B+" || solicitud.tipoDeSangre ==="0+"))
        return solicitudes;        
    }
    
    return(
        hospitales && solicitudes ?
        solicitudesPorTipo().length > 0 && hospitales.length > 0 ?
        <Container className="my-4">
            <Grid container spacing={4}>
            {solicitudesPorTipo().map(solicitud => (
                <Grid item xs={12} sm={6} md={4} key={solicitud._id}>
                    <Solicitud solicitud={solicitud} hospital={nombreHospital(solicitud.hospital)} />
                </Grid>
            ))}
            </Grid>
        </Container> : <h2 className="text-center mt-5">No hay solicitudes disponibles.</h2> : <Spinner />
    )
}