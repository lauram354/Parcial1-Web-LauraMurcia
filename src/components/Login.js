import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import Col from 'react-bootstrap/esm/Col';

function Login() {
    const [formValues, setFormValues] = useState({user:"", password:""})
    const [validationStates, setValidationStates] = useState({userState: true, passwordState: true});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleUserChange = ((e) => {
      setFormValues({...formValues, user: e.target.value})
    });
   
    const handlePasswordChange = ((e) => {
      const password = e.target.value;
      setFormValues({...formValues, password});
      const isValidPassword = /^.+$/.test(password);
      setValidationStates({ ...validationStates, passwordState: isValidPassword });
    });
   
  
    const validateUser = (user) => {
      return /^.+$/.test(user);
    };

    const handleLogin = async (user, pass) => {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({login: user, password: pass}),
        
    })
    
    
    return response
    };
    
  
    const clickSubmit = async () => {
      const isValidUser = validateUser(formValues.user);
      
      setValidationStates({ 
        ...validationStates, 
        userState: isValidUser
      });
  
      if (isValidUser && validationStates.passwordState) {
        
        const user =formValues.user;
        const pass = formValues.password;
        const validLogin = await handleLogin(user, pass)
        if (validLogin.ok){
            navigate("/robots");
            setError(null);
            
        }else{
          setValidationStates({ userState: false, passwordState: false });
          setError("Error de autenticación. Revise sus credenciales")
        }
      }
    };

    const clearForm = () =>{
      setFormValues({ user: "", password: "" }); // Limpiar inputs
      setValidationStates({ userState: true, passwordState: true }); // Restablecer validaciones
      setError(null);
    }
  
  
    return (
      <div className="d-flex flex-column vh-100">
        <div className='container flex-grow-1'>
        <h1> <b> Adopta tu robot con Robot Lovers!</b> </h1>
        <hr/>
        <img src="\banner.png" alt="banner"/>
        <hr/>

        <h1>Inicio de sesión</h1>
        <Row className='justify-content-center'>
        <Col md={6} >
        <Form>
          <Form.Group className="mb-2 text-start" controlId="formBasicUser">
            <Form.Label> <b>Nombre de usuario</b></Form.Label>
            <Form.Control 
              type="user" 
              placeholder="" 
              onChange={handleUserChange} 
              value={formValues.user} 
              isInvalid={!validationStates.userState}
              style={{ backgroundColor: "#D9D9D9", borderRadius: "0px"}} 
            />
            {!validationStates.userState && 
              <Form.Text className="text-danger">
                Usuario invalido.
              </Form.Text>
            }
          </Form.Group>
  
          <Form.Group className="mb-2 text-start" controlId="formBasicPassword">
            <Form.Label><b>Contraseña</b></Form.Label>
            <Form.Control 
              type="password" 
              placeholder="" 
              onChange={handlePasswordChange} 
              value={formValues.password} 
              isInvalid={!validationStates.passwordState}
              style={{ backgroundColor: "#D9D9D9", borderRadius: "0px"}} 

            />
            {!validationStates.passwordState && 
              <Form.Text className="text-danger">
                Contraseña invalida. 
              </Form.Text>
            }
          </Form.Group>

          {error && <h5 style={{color: 'red'}}>{error}</h5>}

          <Row>
            <Col>
              <Button variant="primary" onClick={clickSubmit} className="w-100" >
              Ingresar
            </Button>
            </Col>
            <Col>
            <Button variant="danger" onClick={clearForm} className="w-100" >
            Cancelar
            </Button>
            </Col>
  
          </Row>
          
        </Form>
        </Col>

        </Row>

        </div>
        
        
        

      <Footer/>
      </div>
      
    );
  }
  
  export default Login;
  