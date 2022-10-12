import React from 'react';
import { Link } from "react-router-dom";
import api from "../Services/api"


class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nombre:"",
            correo:""
        }
    }
    cambioValor = (e)=>{
        const state= this.state;
        state[e.target.name]=e.target.value;
        this.setState({state})
    }
    enviarDatos = (e) =>{
        e.preventDefault();
        console.log("Formulario enviado...")
        const{nombre, correo}= this.state;
        console.log(nombre);
        console.log(correo);

        var datosEnviar = {nombre:nombre, correo:correo}

        fetch(api+"?insertar=1",{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(response=>response.json())
        .then((responsedata)=>{
            console.log(responsedata);
            this.props.history.push("/");
        })
        .catch(console.log)

    }

    render() { 
        const{nombre, correo}= this.state;
        return ( 
            <div className="card">
                <div className="card-header">
                    Employee
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className="form-group">
                          <label htmlFor="">Nombre: </label>
                          <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={nombre} className="form-control" placeholder="Ingresa el nombre" aria-describedby="helpId"/>
                          <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <label htmlFor="">Correo: </label>
                          <input type="text" name="correo" id="correo" onChange={this.cambioValor} value={correo} className="form-control" placeholder="Ingresa el correo" aria-describedby="helpId"/>
                          <small id="helpId" className="text-muted">Escribe el correo del empleado</small>
                        </div>
                        <br></br>
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agregar nuevo empleado</button>
                            <Link to={"/"} className="btn btn-primary">Cancelar</Link>
                        </div>
                    </form>
                   
                </div>
                <div className="card-footer text-muted">
                   
                </div>
            </div>
         );
    }
}
 
export default Create;