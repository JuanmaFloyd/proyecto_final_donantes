import { Box, Card, CardContent, Container, Divider, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
})

export const Home = () => {
    const classes = useStyles();
    const [donante, setDonante] = useState("")

    useEffect(() => {
        axios.get("http://localhost:5000/donante/info", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(response => setDonante(response.data))
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
                        {"Su última fecha de donación es el "+fechaDon().getDay()+"/"+(fechaDon().getMonth()+1)+"/"+fechaDon().getFullYear()+ "."}
                    </Typography>
                </CardContent>
            </Card>
        </Container> : null
    )
}