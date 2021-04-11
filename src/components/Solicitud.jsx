import { Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { DropIcon } from './Icons/DropIcon'

export const Solicitud = (props) => {
    const [donantes, setDonantes] = useState(props.solicitud.donantes)

    const dateFormat = {
        day:    '2-digit', 
        month:  '2-digit', 
        year:   'numeric',
        hour:   '2-digit', 
        minute: '2-digit',
        hour12: true 
    }

    const fecha = (date) => {
        var tDate = new Date(date)
        var dateString = tDate.toLocaleDateString('es-ES', dateFormat)
        
        return dateString.replace(',', '')
                         .replace('PM', 'p.m.')
                         .replace('AM', 'a.m.');
    }

    const handleDonacion = () => {
        Swal.fire({
            title: "Desea inscribirse para donar a "+props.solicitud.persona+"?",
            showDenyButton: true,
            denyButtonText: "No, cancelar",
            confirmButtonText: "Sí, deseo inscrbirme"
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {
                    fecha: new Date(),
                    solicitud: props.solicitud._id,
                    hospital: props.solicitud.hospital
                }
        
                axios.post("http://localhost:5000/donacion", data, {"headers": {"token": sessionStorage.getItem("dtoken")}})
                    .then(() => {
                        var donantesAct = donantes + 1
                        setDonantes(donantesAct)
                        swal("Donacion registrada", "", "success")
                    })
                    .catch(err => swal(err.response.data.message, "", "error"));
            }
        })
    }

    return(
        <Card>
            <CardContent>
                <Typography variant="h6">Solicitud de donación abierta</Typography>
                <Divider />
                <Typography>{"Fecha de creación: "+fecha(props.solicitud.fecha)}</Typography>
                <Typography>{"Donaciones: "+donantes+"/"+props.solicitud.cantidad}</Typography>
                <Typography>{"Hospital: "+props.hospital}</Typography>
                <Typography>{"Persona beneficiada: "+props.solicitud.persona}</Typography>
                <Typography><DropIcon />{" "+ props.solicitud.tipoDeSangre}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => handleDonacion()}>
                    Donar!
                </Button>
            </CardActions>
        </Card>
    )
}