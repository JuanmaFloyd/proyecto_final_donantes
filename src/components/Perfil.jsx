import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Grid, Card, CardContent, Container, Divider, makeStyles, Typography } from '@material-ui/core'

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

    function parseDate(fecha) {
        return fecha.slice(9,10)+"/"+fecha.slice(6,7)+"/"+fecha.slice(0,4)        
    }

    function diasUltDonacion(){
        var hoy = new Date()
        var ultimaDon = new Date(donante.fechaDonacion)
        return Math.floor((hoy.getTime() - ultimaDon.getTime()) / (1000 * 3600 * 24))
    }

    return(
        donante ?
        <Container>
            <Grid style={{ padding: 10 }} container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom={'true'} align={'center'} variant="h4">{donante.nombre} {donante.apellido}</Typography>
                        </CardContent>
                    </Card>
                    <Grid item xs={12}>
                        <Box align={'center'} m={2}>
                            <Divider variant="middle" />
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            DNI: {donante.dni}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            Tipo de sangre: {donante.tipoDeSangre}
                            </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            Fecha de nacimiento: {parseDate(donante.fechaNac)}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>  
                        <CardContent>
                            Sexo: {donante.sexo} 
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            Domicilio: {donante.domicilio}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            Localidad: {donante.localidad}
                            </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            Telefono: {donante.telefono}  
                            </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            Mail: {donante.mail}     
                            </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            Ocupación: {donante.ocupacion}    
                            </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            Última Donación: {parseDate(donante.fechaDonacion)} (hace {diasUltDonacion()} días)
                            </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        : null
    )
}