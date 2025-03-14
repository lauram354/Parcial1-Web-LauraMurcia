import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [formValues, setFormValues] = useState({user:"", password:""})
    const [validationStates, setValidationStates] = useState({userState: true, passwordState: true});
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
  
    const clickSubmit = () => {
      const isValidUser = validateUser(formValues.user);
      
      setValidationStates({ 
        ...validationStates, 
        userState: isValidUser
      });
  
      if (isValidUser && validationStates.passwordState) {
        alert(JSON.stringify(formValues));
        navigate("/robots");
        
      }
    };
  
  
    return (
      <div>
        <h1>Inicio de sesión</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control 
              type="user" 
              placeholder="Enter username" 
              onChange={handleUserChange} 
              value={formValues.user} 
              isInvalid={!validationStates.userState}
            />
            {!validationStates.userState && 
              <Form.Text className="text-danger">
                Usuario invalido. El usuario no puede ser vacio.
              </Form.Text>
            }
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              onChange={handlePasswordChange} 
              value={formValues.password} 
              isInvalid={!validationStates.passwordState}
            />
            {!validationStates.passwordState && 
              <Form.Text className="text-danger">
                Contraseña invalida. La contraseña no puede ser vacía. 
              </Form.Text>
            }
          </Form.Group>
  
          <Row>
          <Button variant="primary" onClick={clickSubmit}>
            Ingresar
          </Button>
          <Button variant="primary" onClick={clickSubmit}>
            Cancelar
          </Button>
  
          </Row>
          
        </Form>
      </div>
    );
  }
  
  export default Login;
  