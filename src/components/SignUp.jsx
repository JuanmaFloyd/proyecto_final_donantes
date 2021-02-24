import { Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React from 'react'

export const SignUp = () => {
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
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="apellido"
                        name="apellido"
                        label="Apellido"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField 
                        id="dni"
                        name="dni"
                        label="DNI"
                        fullWidth
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
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Sexo</InputLabel>
                        <Select
                            id="sexo"
                            name="sexo"
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
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="locaclidad"
                        name="localidad"
                        label="Localidad"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="domicilioDNI"
                        name="domicilioDNI"
                        label="Domicilio del DNI"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="localidadDNI"
                        name="localidadDNI"
                        label="Localidad del DNI"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="telefono"
                        name="telefono"
                        label="Teléfono"
                        type="Number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="cp"
                        name="cp"
                        label="Código postal"
                        type="Number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField 
                        id="mail"
                        name="mail"
                        label="E-mail"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="lugarNac"
                        name="lugarNac"
                        label="Lugar de nacimiento"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="ocupacion"
                        name="ocupacion"
                        label="Ocupación"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                        <InputLabel>Tipo de sangre</InputLabel>
                        <Select
                            id="tipo"
                            name="tipo"
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
            </Grid>
        </Container>
    )
}