export function convertirFormato(fechaISO) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const fecha = new Date(fechaISO);
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    let horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    let ampm = 'AM';

    // Convertir a formato de 12 horas
    if (horas >= 12) {
        horas = horas - 12;
        ampm = 'PM';
    }

    // Asegurar que las 12:00 PM se muestren correctamente
    if (horas === 0) {
        horas = 12;
    }

    // Formatear el día con su sufijo (ej: 1st, 2nd, 3rd, 4th, ...)
    let sufijoDia;
    if (dia === 1 || dia === 21 || dia === 31) {
        sufijoDia = 'st';
    } else if (dia === 2 || dia === 22) {
        sufijoDia = 'nd';
    } else if (dia === 3 || dia === 23) {
        sufijoDia = 'rd';
    } else {
        sufijoDia = 'th';
    }

    // Construir la cadena de fecha en el formato deseado
    const fechaFormateada = `${dia}${sufijoDia} ${mes} ${anio} at ${horas}:${minutos < 10 ? '0' : ''}${minutos} ${ampm}`;

    return fechaFormateada;
}
