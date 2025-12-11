import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../Css/Layout.css';
import { useEffect } from "react";
import {CreateToken} from '../Helper/TokenHelper';

const Layout = () => {

        const initializeToken = async () => {
            try {
                await CreateToken();
            } catch (error) {
                // Manejo de errores si la generación falla por completo
                console.error("Fallo crítico en la inicialización del token:", error);
            } finally {

            }
        };

        useEffect(() => {
        let Token;
        Token = localStorage.getItem('token');

        if (Token === null)
        {
            initializeToken();
        }

      }, []);


  return (
<>

 <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
  <Container>
    
    <Navbar.Brand>
      <Link to="/">Home</Link>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        
        <Nav.Link as={Link} to="NuevosContactos">
          Nuevos
        </Nav.Link>

        <Nav.Link as={Link} to="Contactados">
          Contactados
        </Nav.Link>

       <Nav.Link as={Link} to="Recontactados">
          Recontactados
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

<Outlet />
    
</>

  )
};

export default Layout;
