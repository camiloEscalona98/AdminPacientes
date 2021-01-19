import React, { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
const Formulario = ({crearCita}) => {


    // crear State de Citas 
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    // crear State de error
    const [error, actualizarError] = useState(false)

    //funcion que se ejecuta cuando el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            //leer contenido y guardarlo
            [e.target.name]: e.target.value
        })
    }
    //extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;


    //funcion de envio formulario
    const submitCita = e => {
        e.preventDefault();
        // Validar

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
         || hora.trim() === '' || sintomas.trim() === '' ) //trim es para eliminar espacios en blanco
        {
            actualizarError(true);
            return;
        }
        //eliminar mensaje previo
        actualizarError(false);
        // Asignar ID
        cita.id = uuid();
        // Crear Cita
        crearCita(cita);
        //Reiniciar el formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
 
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>    : null}
            <form
                onSubmit={submitCita}

            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}

                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}

                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>

            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;