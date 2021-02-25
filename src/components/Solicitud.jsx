import { Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import React from 'react'

export const Solicitud = (props) => {

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

    return(
        <Card>
            <CardContent>
                <Typography variant="h6">Solicitud de donación abierta</Typography>
                <Divider />
                <Typography>{"Fecha de creación: "+fecha(props.solicitud.fecha)}</Typography>
                <Typography>{"Donaciones: "+props.solicitud.donantes+"/"+props.solicitud.cantidad}</Typography>
                <Typography>{"Hospital: "+props.hospital}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Donar!
                </Button>
            </CardActions>
        </Card>
    )
}