import { Button, Avatar, Card, CardActions, CardContent, Divider, Typography, makeStyles} from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import swal from '@sweetalert/with-react'
import withReactContent from 'sweetalert2-react-content'
import { DropIcon } from './Icons/DropIcon'
import { SocialIcon } from 'react-social-icons'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { recibeDe } from '../util/util'

const MySwal = withReactContent(Swal)

const useStyles = makeStyles({
    botonDonar: {
        textTransform: 'none',
        fontWeight: 'bold'
    },

    botonCompartir: {
        flex: 1, 
        textTransform: 'none',
        fontWeight: 'bold',
        '&:hover': {
            background: "#fff",
        }
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
        if(navigator.share){
            navigator.share({
                text: textoCompartir()
            }).catch(console.error);
        }
        else {
            MySwal.fire({
                title:
                <div>
                    <h2>Compartir búsqueda</h2>
                    <br />
                    <TwitterShareButton style={{marginRight: '10px'}} url={textoCompartir()}><SocialIcon network="twitter" /></TwitterShareButton>
                    <FacebookShareButton url={'www.google.com'} quote={textoCompartir('fb')}><SocialIcon network="facebook" /></FacebookShareButton>
                </div>,
                showConfirmButton: false
            })
            
        }
    }

    function textoCompartir(red) {
        var inicio = props.solicitud.cantidad > 1 ? "Hola! Se necesitan " + props.solicitud.cantidad + " dadores"
            : "Hola! Se necesita un dador"
        var fin = red === 'fb' ? "<3" : "🩸❤️"
    
        return inicio + " de sangre de tipo" + recibeDe(props.solicitud.tipoDeSangre).map(item => {return ' ' + item})
        + " para " + props.solicitud.persona + ". Si estás interesadx por favor dirigite al " +
        stringHospital(props.hospital) + ". Nos ayudarías mucho también compartiendo esta publicación! " + fin
    }

    function stringHospital(nombre){
        if(nombre.startsWith("hospital") || nombre.startsWith("Hospital"))
            return nombre[0].toUpperCase() + nombre.substring(1)
        else return "Hospital " + nombre;
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
                <Button startIcon={<Avatar src='https://cdn.iconscout.com/icon/free/png-256/share-forword-sharing-media-social-link-viral-6-3136.png' />}
                     className={classes.botonCompartir} size="medium" onClick={() => handleShare()}>
                </Button>
            </CardActions>
        </Card>
    )
}