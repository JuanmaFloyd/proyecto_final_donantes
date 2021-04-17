import { Avatar, Button, Divider, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import './SolicitudCard.css'
import withReactContent from 'sweetalert2-react-content'
import { DropIcon } from '../Icons/DropIcon'
import { SocialIcon } from 'react-social-icons'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { recibeDe } from '../../util/util'

const MySwal = withReactContent(Swal)

export const SolicitudCard = (props) => {

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
                    <WhatsappShareButton style={{marginRight: '10px'}} url={textoCompartir()}><SocialIcon network="whatsapp" /></WhatsappShareButton>
                    <FacebookShareButton url={'www.google.com'} quote={textoCompartir('fb')}><SocialIcon network="facebook" /></FacebookShareButton>
                </div>,
                showConfirmButton: false
            })
        }
    }

    function textoCompartir(red) {
        var inicio = (props.solicitud.cantidad - parseInt(donantes)) > 1 ? "Hola! Se necesitan " + (props.solicitud.cantidad - parseInt(donantes)) + " dadores"
            : "Hola! Se necesita un dador"
        var fin = red === 'fb' ? "<3" : "🩸❤️"

        var tiposCompatibles = recibeDe(props.solicitud.tipoDeSangre)
        var strTipos = tiposCompatibles.join(", ")
        var ultimoTipo = strTipos.substring(strTipos.length - 2, strTipos.length)
        var strFinal = strTipos.substring(0, strTipos.length - 4) + ' y ' + ultimoTipo
    
        return inicio + " de sangre de tipo " + strFinal + " para " + props.solicitud.persona +
        ". Si estás interesadx en donar por favor dirigite al " + stringHospital(props.hospital)
        + ". Nos ayudarías mucho también compartiendo esta publicación! " + fin
    }

    function stringHospital(nombre){
        if(nombre.startsWith("hospital") || nombre.startsWith("Hospital"))
            return nombre[0].toUpperCase() + nombre.substring(1)
        else return "Hospital " + nombre;
    }

    return (
        <div className="card card-custom bg-white border-white border-0">
          <div className="card-custom-img" style={{backgroundImage: "url(https://ak6.picdn.net/shutterstock/videos/10028756/thumb/1.jpg)"}}></div>
          <div className="card-custom-avatar">
            <img className="img-fluid" src="https://media.istockphoto.com/vectors/heart-shape-vector-id936563406?k=6&m=936563406&s=612x612&w=0&h=kqOHdDoUYN9V4Dc451gXKHpSkY-KHMUekBqPTMcEJp0=" alt="Avatar" />
          </div>
          <div className="card-body" style={{overflowY: "auto"}}>
            <h4 className="card-title">Solicitud de donación abierta</h4>
            <Divider />
                <Typography>{"Fecha de creación: "+fecha(props.solicitud.fecha)}</Typography>
                <Typography>{"Donaciones: "+donantes+"/"+props.solicitud.cantidad}</Typography>
                <Typography>{"Hospital: "+props.hospital}</Typography>
                <Typography>{"Persona beneficiada: "+props.solicitud.persona}</Typography>
                <Typography><DropIcon />{" "+ props.solicitud.tipoDeSangre}</Typography>
            </div>
          <div className="card-footer" style={{background: "inherit", borderColor: "inherit"}}>
            <Button className="btn" size="large" color="primary" onClick={() => handleDonacion()}>
                Donar!
            </Button>
            <Button startIcon={<Avatar src='https://cdn.iconscout.com/icon/free/png-256/share-forword-sharing-media-social-link-viral-6-3136.png' />}
                    className="btn" size="medium" onClick={() => handleShare()}>
            </Button>
          </div>
        </div>
    )
}