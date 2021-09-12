import { Alert } from '@material-ui/lab';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as util from '../../util/util.js'

export const WarningMsg = () => {
    const [donante, setDonante] = useState("")
    const [hospital, setHospital] = useState("")
    const [persona, setPersona] = useState("")

    useEffect(() => {
        axios.get("http://localhost:5000/donante/info", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(response => setDonante(response.data))

        axios.get("http://localhost:5000/donacion/donante", {"headers": {"token": sessionStorage.getItem("dtoken")}})
            .then(response => {
                setHospital(response.data.hospital)
                setPersona(response.data.persona)
            })
    }, [])

    return(
        donante ?
            !donante.anotadoEnSolicitud ? null :
            <Alert severity="warning" className="mb-3">
            {
                persona !== "" && hospital !== "" ?
                "Estás en lista para la solicitud correspondiente a "+ util.getIniciales(persona) +
                " Para efectuar la donación, dirigite al hospital "+ hospital + "." : "Cargando..."
            } 
            </Alert> : null
    )
}