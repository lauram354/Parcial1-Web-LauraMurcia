
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Footer from './footer';

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

    const getUrl = (url) => {
        if (url.includes("github.com") && url.includes("/blob/")) {
            return url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
        }
        return url; 
    };

    return(
        <div className="d-flex flex-column vh-100">
            <div className='container flex-grow-1'>
            <h1> <b> Adopta tu robot con Robot Lovers!</b> </h1>
            <hr/>
            <img src="\banner.png" alt="banner"/>
            <hr/>

            <div>
                
                <Row className="g-5">
                    <Col md={8}>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Empresa Fabricante</th>
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
                    </table>
                    </Col>
                    
                    <Col md={4}>
                    {detail && (
                            <div className="card border-dark mb-3 text-center" style={{width: "25rem", backgroundColor: "#D9D9D980", borderRadius: "0px"}}>
                            <h5 className="card-title">{detail.nombre}</h5>
                            <div className='center'>
                            <img src={getUrl(detail.imagen)} class="card-img-top border-dark mb-3 " alt={detail.nombre} style={{width: "60%",height: "auto",border: "2px solid #ccc",borderRadius: "0px"}}/>
                            </div>
                            <div className="card-body text-start">
                                <p className="card-text"><b>→ Año fabricación: </b>{detail.añoFabricacion}</p>
                                <p className="card-text"><b>→ Capacidad de Procesamiento: </b> {detail.capacidadProcesamiento}</p>
                                <p className="card-text"><b>→ Humor: </b>{detail.humor}</p>
                                
                            </div>
                            </div>
                    )}
                    </Col>


                </Row>

            </div>
            </div>

            <Footer/>

        </div>
    )
};

export default Robots;