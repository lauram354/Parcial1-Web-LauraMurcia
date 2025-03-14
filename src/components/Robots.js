
import Table  from 'react-bootstrap/Table';
import Detail from './Detail';
import Col from 'react-bootstrap/esm/Col';


const { useEffect, useState } = require("react");

function Robots(){
    const [robots, setRobots] = useState([]);
    const [detail, setDetail] = useState();

    useEffect(()=>{
        const URL = "http://localhost:3001/robots";
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                setRobots(data);
            });
    }, []);

    const renderDetail = () =>{
        if (detail){
            return(
                <div>
            
                <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src="" alt=""/>
                <div className="card-body">
                    <h5 className="card-text">
                        "hola soy robot"
                    </h5>
                    <h6 className="card-text">"h"</h6>
                </div>
                </div>

                </div>
            )
        }
    }

    const handleDetail = (robot) =>{
        setDetail(robot)
    }

    return(
        <div>
            <h1> Adopta tu robot con Robot Lovers!</h1>
            <div>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Modelo</th>
                                <th>Empresa Fabricante</th>
                            </tr>
                        </thead>
                        <tbody >
                            {robots.map((robot) => (
                                <tr key={robot.id} onClick= {() => {handleDetail(robot)}}>
                                    <td>{robot.id} </td>
                                    <td>{robot.nombre}</td>
                                    <td>{robot.modelo }</td>
                                    <td>{robot.empresaFabricante}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

            </div>

        </div>
    )
};

export default Robots;