import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Card, CardContent, Container, Divider, makeStyles, Typography, Form } from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
})

export const Perfil = () => {
    const classes = useStyles();
    const [donante, setDonante] = useState("")

    useEffect(() => {
        axios.get("http://localhost:5000/donante/info", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(response => setDonante(response.data))
    }, [])

    return(
        donante ?
        <Container>
            {JSON.stringify(donante)}
            <form>
                <label>
                    Nombre y apellido: {donante.nombre} {donante.apellido}
                </label>
                <label>
                    DNI: {donante.dni}
                </label>
            </form>

        </Container>
        : null
    )
}