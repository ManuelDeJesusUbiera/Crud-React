import React from 'react';
import { Link } from "react-router-dom";
import api from "../Services/api"
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedData: false,
            employee:[]
        }
    }

    Borrar= (id)=>{
        console.log(id);
        fetch(api+"?borrar="+id)
        .then(response=>response.json())
        .then((responsedata)=>{
            console.log(responsedata);
            this.LoadData();
        })
        .catch(console.log)
    }
   
    LoadData(){
        fetch(api)
        .then(response=>response.json())
        .then((responsedata)=>{
            console.log(responsedata);
            this.setState({loadedData: true, employee:responsedata})
        })
        .catch(console.log)
    }
    componentDidMount(){
        this.LoadData();
    }
    render() { 
        const{loadedData, employee}=this.state

        if(!loadedData) {return(<div>Loading...</div>)}
        else{
        return (  
            <div className="card">
                <div className="card-header">
                <Link className="btn btn-success" to={"/Create"}>Agregar nuevo empleado</Link>
                </div>
                <div className="card-body">
                <h4>Lista de empleados</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map(
                            (data)=>(
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.nombre}</td>
                                    <td>{data.correo}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="">
                                            <Link className="btn btn-warning" to={"/Edit/"+data.id}>Edit</Link>
                                            <button type='button' className="btn btn-danger"
                                            onClick={()=>this.Borrar(data.id)}>Delete</button>
                                        
                                        </div>
                                    </td>
                                </tr>
                            )

                            
                        )}
                        
                    </tbody>
                </table>
                </div>
            </div>
        
        );
        }
    }
}
 
export default List;