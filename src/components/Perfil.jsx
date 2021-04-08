import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Grid, Card, CardContent, Container, Divider, Typography, Fab, makeStyles, TextField } from '@material-ui/core'
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';

const useStyles = makeStyles({
    button: {
        position: "fixed",
        right: "100px",
        bottom: "40px",
    },
    button2: {
        position: "fixed",
        right: "180px",
        bottom: "40px",
    },
    animated: {
        animationName: '$fadein',
        animationDuration: '0.5s',
        animationFillMode: 'forwards'
      },
      '@keyframes fadein': {
        '0%': {
            position: "fixed",
            right: "100px",
            bottom: "40px",
        },
        '100%': {
            position: "fixed",
            right: "180px",
            bottom: "40px",
        }
      }
})

export const Perfil = () => {
    const [donante, setDonante] = useState("")
    const [edit, setEdit] = useState(false)
    const [domicilio, setDomicilio] = useState("");
    const [telefono, setTelefono] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [ocupacion, setOcupacion] = useState("");
    const [mail, setMail] = useState("");
    const classes = useStyles()
    
    useEffect(() => {
        axios.get("http://localhost:5000/donante/info", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(response => setDonante(response.data))
    }, [])

    function parseDate(fecha) {
        var date = new Date(fecha)
        return (date.getDate()+1)+"/"+(date.getMonth()+1)+"/"+date.getFullYear()        
    }

    function diasUltDonacion(){
        var hoy = new Date()
        var ultimaDon = new Date(donante.fechaDonacion)
        return Math.floor((hoy.getTime() - ultimaDon.getTime()) / (1000 * 3600 * 24))
    }
    
    const handleEdit = () => {

        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: (domicilio === "" ? donante.domicilio : domicilio) + ", " + (localidad === "" ? donante.localidad : localidad),
                key: "AIzaSyDI4eXkh46mcHYH1Qfuxp4x18sBgQG7pfc"
            }
        }).then(res => {
            if (res.data.results.length === 0) {
                swal("Revise que su domicilio y ciudad sean válidos.", "", "error")
                return;
            }

            var location = res.data.results[0].geometry.location
            
            var data = {
                localidad: localidad === "" ? donante.localidad : localidad,
                domicilio: domicilio === "" ? donante.domicilio : domicilio,
                telefono: telefono === "" ? donante.telefono : telefono,
                mail: mail === "" ? donante.mail : mail,
                ocupacion: ocupacion === "" ? donante.ocupacion : ocupacion,
                latitud: location.lat,
                longitud: location.lng,
            }

            axios.put("http://localhost:5000/donante", data, {"headers": {"token": sessionStorage.getItem("dtoken")}})
                .then((res) => { 
                    setDonante(res.data)
                    setEdit(false)
                })
                .catch((error) => {
                    swal(error.response.data, "", "error")
                })
        })
    }

    return(
        donante ?
        !edit ?
        <Container>
            <Grid style={{ padding: 10 }} container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom={true} align={'center'} variant="h4">{donante.nombre} {donante.apellido}</Typography>
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
                            Última Donación: { donante.fechaDonacion ?
                                parseDate(donante.fechaDonacion) + " (hace " + diasUltDonacion() +" días)." 
                                : "Sin donaciones"}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Fab onClick={() => setEdit(true)} className={classes.button} color="primary">
                <EditIcon />
            </Fab>
        </Container> 
        : 
        <Container>
            <Grid style={{ padding: 10 }} container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom={true} align={'center'} variant="h4">{donante.nombre} {donante.apellido}</Typography>
                        </CardContent>
                    </Card>
                    <Grid item xs={12}>
                        <Box align={'center'} m={2}>
                            <Divider variant="middle" />
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        id="domicilio"
                        name="domicilio"
                        label="Domicilio"
                        variant="outlined"
                        defaultValue={donante.domicilio}
                        fullWidth
                        onChange={(event) => setDomicilio(event.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        id="localidad"
                        name="localidad"
                        label="Localidad"
                        variant="outlined"
                        defaultValue={donante.localidad}
                        fullWidth
                        onChange={(event) => setLocalidad(event.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        id="ocupacion"
                        name="ocupacion"
                        label="Ocupación"
                        variant="outlined"
                        defaultValue={donante.ocupacion}
                        fullWidth
                        onChange={(event) => setOcupacion(event.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        id="mail"
                        name="mail"
                        label="E-mail"
                        variant="outlined"
                        defaultValue={donante.mail}
                        fullWidth
                        onChange={(event) => setMail(event.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        id="telefono"
                        name="telefono"
                        label="Teléfono"
                        variant="outlined"
                        defaultValue={donante.telefono}
                        fullWidth
                        onChange={(event) => setTelefono(event.target.value)}
                    />
                </Grid>
            </Grid>
            <Fab onClick={() => setEdit(false)} className={classes.animated} color="secondary">
                <CloseIcon />
            </Fab>
            <Fab onClick={() => handleEdit()} className={classes.button} color="primary">
                <CheckIcon />
            </Fab>
        </Container> 
        : null
    )
}