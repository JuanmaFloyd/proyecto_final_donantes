import { Button, IconButton, Card, CardActions, CardContent, Divider, Typography, makeStyles} from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import swal from '@sweetalert/with-react';
import { DropIcon } from './Icons/DropIcon'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles({
    botonDonar: {
        textTransform: 'none',
        fontWeight: 'bold'
    },

    botonCompartir: {
        flex: 1, 
        textTransform: 'none',
        fontWeight: 'bold'
    },

    overlay: {
        opacity: 1,
        position: 'absolute',
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100vw',
        heigth: '100vh',
        background: 'rgba(0,0,0,.5)'
    },

    share: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '30%',
        margin: 'auto',
        width: '50%',
        zIndex: 1,
        padding: '1em',
        background: 'white' 
    }
})

export const Solicitud = (props) => {
    const [donantes, setDonantes] = useState(props.solicitud.donantes)
    const classes = useStyles()

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

    const handleShare = () => {
        swal(
            <div>
            <div className={classes.overlay}></div>
            <div /*className={classes.share}*/>
                <h2>Compartir</h2>
                <br />
                <IconButton><FacebookIcon /></IconButton>
                <IconButton><TwitterIcon /></IconButton>
            </div>
            </div>, {buttons: false}
          )
    }

    const shareFacebook = () => {
        console.log("hola")
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
                <Button className={classes.botonDonar} size="large" color="primary" onClick={() => handleDonacion()}>
                    Donar!
                </Button>
                <Button className={classes.botonCompartir} size="large" color="primary" onClick={() => handleShare()}>
                    Compartir
                </Button>
            </CardActions>
        </Card>
    )
}