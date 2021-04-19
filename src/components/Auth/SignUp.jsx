import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import swal from 'sweetalert';

export const SignUp = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApelldio] = useState("");
    const [dni, setDni] = useState("");
    const [fechanac, setFechanac] = useState("1999-01-01");
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
    const [pass, setPass] = useState("");
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:5000/donante/isAuth", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(() => history.push("/"))
            .catch(() => null)
    }, [history])

    var validarFechaNac = (f) => {
        var hoy = new Date();
        var fecha = new Date(f);
        var edad = hoy.getFullYear() - fecha.getFullYear();
        var m = hoy.getMonth() - fecha.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
            edad--;
        }
        if(edad < 18){ 
            return false
        }
        return true;
    }

    const handleSave = () => {
        if(validarFechaNac(fechanac) === false){
            swal("Debe ser mayor de 18 años.", "", "error");
            return;
        }

        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: domicilio + ", " + localidad,
                key: "AIzaSyDI4eXkh46mcHYH1Qfuxp4x18sBgQG7pfc"
            }
        }).then(res => {
            if (res.data.results.length === 0) {
                swal("Revise que su domicilio y ciudad sean válidos.", "", "error")
                return;
            }


            var location = res.data.results[0].geometry.location
            
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
                latitud: location.lat,
                longitud: location.lng,
                password: pass
            }
            
            axios.post("http://localhost:5000/donante/signup", data)
                .then(() => { 
                    swal("Has sido registrado!", "", "success")
                
                    var dataLogin = {
                        dni: dni,
                        password: '123123'
                    }
                
                    axios.post("http://localhost:5000/donante/signin", dataLogin)
                        .then(res => {
                            sessionStorage.setItem("dtoken", res.data);
                            history.push("/solicitudes");
                        })
                })
                .catch((error) => {
                    swal(error.response.data, "", "error")
                })
        })
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
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="dni"
                        name="dni"
                        label="DNI"
                        fullWidth
                        onChange={(event) => setDni(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                        id="pass"
                        name="pass"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        onChange={(event) => setPass(event.target.value)}
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
                    <Button color="secondary" onClick={() => history.push("/login")}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={() => handleSave()}>Registrarse</Button>
                </Grid>
                    
            </Grid>
        </Container>
    )
}