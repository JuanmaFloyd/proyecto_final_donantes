export const FiltroPorTipo = (solicitudes, tipoDeSangre) => {
    if (tipoDeSangre === "A+")
        return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "A+" || solicitud.tipoDeSangre ==="AB+"))
    if (tipoDeSangre === "A-")
        return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "A+" || solicitud.tipoDeSangre ==="AB+" || solicitud.tipoDeSangre ==="A-" || solicitud.tipoDeSangre ==="AB-"))
    if (tipoDeSangre === "B+")
        return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "B+" || solicitud.tipoDeSangre ==="AB+"))
    if (tipoDeSangre === "B-")
        return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "B+" || solicitud.tipoDeSangre ==="AB+" || solicitud.tipoDeSangre ==="B-" || solicitud.tipoDeSangre ==="AB-"))
    if (tipoDeSangre === "AB+")
        return solicitudes.filter(solicitud => (solicitud.tipoDeSangre ==="AB+"))
    if (tipoDeSangre === "AB-")
        return solicitudes.filter(solicitud => (solicitud.tipoDeSangre ==="AB+" || solicitud.tipoDeSangre ==="AB-"))
    if (tipoDeSangre === "0+")
        return solicitudes.filter(solicitud => (solicitud.tipoDeSangre === "A+" || solicitud.tipoDeSangre ==="AB+" || solicitud.tipoDeSangre ==="B+" || solicitud.tipoDeSangre ==="0+"))
    return solicitudes;      
}