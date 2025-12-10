import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../Css/Layout.css';

const Layout = () => {

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
