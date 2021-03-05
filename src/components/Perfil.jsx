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

    const fechaNac = () => {
        return new Date(donante.fechaNac)
    }

    function parseDate() {
        if(donante != null){
            return fechaNac().getDay()+"/"+(fechaNac().getMonth()+1)+"/"+fechaNac().getFullYear()
        }
        
    }

    return(
        donante ?
        <Container>
            <form>
                <label>
                    Nombre y apellido: {donante.nombre} {donante.apellido}
                </label>
                <div></div>
                <label>
                    DNI: {donante.dni}
                </label>
                <div></div>
                <label>
                    Tipo de sangre: {donante.tipoDeSangre}
                </label>
                <div></div>
                <label>
                    Fecha de nacimiento: {donante.fechaNac} {parseDate()}
                </label>
                <div></div>
                <label>
                    Sexo: {donante.sexo}
                </label>
                <div></div>
                <label>
                    Domicilio {donante.domicilio}
                </label>
                <div></div>
                <label>
                    Localidad: {donante.localidad}
                </label>
                <div></div>
                <label>
                    Telefono: {donante.telefono}
                </label>
                <div></div>
                <label>
                    Mail: {donante.mail}
                </label>
                <div></div>
                <label>
                    Ocupación: {donante.ocupacion}
                </label>
                <div></div>
                <label>
                    Última Donación: {donante.fechaDonacion}
                </label>
            </form>

        </Container>
        : null
    )
}