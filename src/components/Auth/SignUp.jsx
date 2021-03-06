import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import swal from 'sweetalert';

export const SignUp = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApelldio] = useState("");
    const [dni, setDni] = useState("");
    const [fechanac, setFechanac] = useState("");
    const [sexo, setSexo] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [domiciliodni, setDomiciliodni] = useState("");
    const [localidaddni, setLocalidaddni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [cp, setCp] = useState("");
    const [mail, setMail] = useState("");
    const [lugarnac, setLugarnac] = useState("");
    const [ocupacion, setOcupacion] = useState("");
    const [tipo, setTipo] = useState("");

    const handleSave = () => {
        var data = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            fechaNac: fechanac,
            sexo: sexo,
            domicilio: domicilio,
            localidad: localidad,
            domicilioDNI: domiciliodni,
            localidadDNI: localidaddni,
            telefono: telefono,
            codPostal: cp,
            mail: mail,
            lugarNac: lugarnac,
            ocupacion: ocupacion,
            tipoDeSangre: tipo,
            password: '123123'
        }
        
        axios.post("http://localhost:5000/donante/signup", data)
            .then(() => swal("Donante guardado", "", "success"))
    }

    return(
        <Container>
            <Typography variant='h6'>Datos personales</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        fullWidth
                        onChange={(event) => setNombre(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="apellido"
                        name="apellido"
                        label="Apellido"
                        fullWidth
                        onChange={(event) => setApelldio(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField 
                        id="dni"
                        name="dni"
                        label="DNI"
                        fullWidth
                        onChange={(event) => setDni(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="fechaNac"
                        name="fechaNac"
                        label="Fecha de nacimiento"
                        type="date"
                        defaultValue="1999-01-01"
                        fullWidth
                        onChange={(event) => setFechanac(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Sexo</InputLabel>
                        <Select
                            id="sexo"
                            name="sexo"
                            value={sexo}
                            onChange={(event) => setSexo(event.target.value)}
                        >
                            <MenuItem value={"femenino"}>femenino</MenuItem>
                            <MenuItem value={"masculino"}>masculino</MenuItem>    
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="domicilio"
                        name="domicilio"
                        label="Domicilio"
                        fullWidth
                        onChange={(event) => setDomicilio(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="locaclidad"
                        name="localidad"
                        label="Localidad"
                        fullWidth
                        onChange={(event) => setLocalidad(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="domicilioDNI"
                        name="domicilioDNI"
                        label="Domicilio del DNI"
                        fullWidth
                        onChange={(event) => setDomiciliodni(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="localidadDNI"
                        name="localidadDNI"
                        label="Localidad del DNI"
                        fullWidth
                        onChange={(event) => setLocalidaddni(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="telefono"
                        name="telefono"
                        label="Teléfono"
                        type="Number"
                        fullWidth
                        onChange={(event) => setTelefono(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="cp"
                        name="cp"
                        label="Código postal"
                        type="Number"
                        fullWidth
                        onChange={(event) => setCp(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField 
                        id="mail"
                        name="mail"
                        label="E-mail"
                        fullWidth
                        onChange={(event) => setMail(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="lugarNac"
                        name="lugarNac"
                        label="Lugar de nacimiento"
                        fullWidth
                        onChange={(event) => setLugarnac(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="ocupacion"
                        name="ocupacion"
                        label="Ocupación"
                        fullWidth
                        onChange={(event) => setOcupacion(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                        <InputLabel>Tipo de sangre</InputLabel>
                        <Select
                            id="tipo"
                            name="tipo"
                            value={tipo}
                            onChange={(event) => setTipo(event.target.value)}
                        >
                            <MenuItem value={"0+"}>0+</MenuItem>
                            <MenuItem value={"0-"}>0-</MenuItem>
                            <MenuItem value={"A+"}>A+</MenuItem>
                            <MenuItem value={"A-"}>A-</MenuItem>
                            <MenuItem value={"B+"}>B+</MenuItem>
                            <MenuItem value={"B-"}>B-</MenuItem>
                            <MenuItem value={"AB+"}>AB+</MenuItem>
                            <MenuItem value={"AB-"}>AB-</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={() => handleSave()}>Registrarse</Button>
                </Grid>
            </Grid>
        </Container>
    )
}