import React from 'react';
import { Link } from "react-router-dom";
import api from "../Services/api"

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            loadedData: false,
            employee:[]
        }
    }
    cambioValor = (e)=>{
        const state= this.state.employee;
        state[e.target.name]=e.target.value;
        this.setState({employee:state})
    }
    enviarDatos = (e) =>{
        e.preventDefault();
        console.log("Formulario enviado...");
        const{id,nombre,correo} = this.state.employee;

        var datosEnviar = {id:id, nombre:nombre, correo:correo}

        fetch(api+"?actualizar=1",{
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
    componentDidMount(){
        
        fetch(api+"?consultar="+ this.props.match.params.id)
        .then(response=>response.json())
        .then((responsedata)=>{
            console.log(responsedata);
            this.setState({loadedData: true, employee:responsedata[0]})
        })
        .catch(console.log)
    }
    
    render() { 
        const{loadedData, employee}=this.state
        if(!loadedData) {return(<div>Loading...</div>)}
        else{
        return ( <div className="card">
            <div className="card-header">
                Edit employee
            </div>
            <div className="card-body">
                
                <form onSubmit={this.enviarDatos}>
                    <div className="form-group">
                      <label htmlFor="">Clave</label>
                      <input type="text" readOnly className="form-control" value={employee.id} name="id" id="" onChange={this.cambioValor} aria-describedby="helpId" placeholder=""/>
                      <small id="helpId" className="form-text text-muted"></small>
                      <br></br>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Nombre: </label>
                        <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={employee.nombre} className="form-control" placeholder="Ingresa el nombre" aria-describedby="helpId"/>
                        <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="">Correo: </label>
                        <input type="text" name="correo" id="correo" onChange={this.cambioValor} value={employee.correo} className="form-control" placeholder="Ingresa el correo" aria-describedby="helpId"/>
                        <small id="helpId" className="text-muted">Escribe el correo del empleado</small>
                    </div>
                    <br></br>
                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Editar empleado</button>
                        <Link to={"/"} className="btn btn-primary">Cancelar</Link>
                    </div>
                </form>
            </div>
            <div className="card-footer text-muted">
                
            </div>
        </div> );
        }
    }
}
 
export default Edit;