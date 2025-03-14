
import Table  from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


const { useEffect, useState } = require("react");

function Robots(){
    const [robots, setRobots] = useState([]);
    const [detail, setDetail] = useState(null);

    useEffect(()=>{
        const URL = "http://localhost:3001/robots";
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                setRobots(data);
            });
    }, []);



    const handleDetail = (robot) =>{
        const URL = `http://localhost:3001/robots/${robot.id}`;
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                setDetail(data);
            });
        
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

                    {detail && (
                        <Card style={{ width: '18rem' }}>
                        <Card.Title>{detail.nombre}</Card.Title>
                        <Card.Img variant="top" src={detail.imagen} />
                        <Card.Body>
                          <Card.Text>
                            {detail.añoFabricacion}
                            {detail.capacidadProcesamiento}
                            {detail.humor}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                )}

            </div>

        </div>
    )
};

export default Robots;