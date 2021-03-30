import { Box, Card, CardContent, Container, Divider, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Home = () => {
    const [donante, setDonante] = useState("")
    const [hospital, setHospital] = useState("")
    const [persona, setPersona] = useState("")

    useEffect(() => {
        axios.get("http://localhost:5000/donante/info", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(response => setDonante(response.data))

        axios.get("http://localhost:5000/donacion/donante", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(response => {
                setHospital(response.data.hospital)
                setPersona(response.data.persona)
            })
    }, [])

    const fechaDon = () => {
        return new Date(donante.fechaDonacion)
    }

    return(
        donante ?
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4">{(donante.sexo === "masculino") ? "Bienvenido, "+donante.nombre : "Bienvenida, "+donante.nombre}</Typography>
                    <Box m={2}>
                        <Divider variant="middle" />
                    </Box>
                    <Typography variant="subtitle1" color="primary">
                        {   !donante.anotadoEnSolicitud ? (
                                donante.fechaDonacion ? 
                                "Su última fecha de donación es el "+(fechaDon().getDate()+1)+"/"+(fechaDon().getMonth()+1)+"/"+fechaDon().getFullYear()+ "." 
                                : "Usted aún no ha realizado donaciones."
                            ) :
                            "Usted se encuentra en lista para la solicitud correspondiente a "+persona+
                            ". Para efectuar la donación, diríjase al hospital "+hospital+"."
                        }
                    </Typography>
                </CardContent>
            </Card>
        </Container> : null
    )
}