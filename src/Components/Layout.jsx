import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../Css/Layout.css';
import { List } from "../Api/TipoInscripcionHelper";

const Layout = () => {

    const [TipoInscripcion, setTipoInscripcion] = useState([]);

    useEffect(() => {

      CreateMenu();

    }, []);


const CreateMenu = async () => 
{
    let data;
    try 
    {
        data = await List();
        setTipoInscripcion(data);

    } 
    catch (error) 
    {
        console.error("Fallo crítico en la inicialización del token:", error);
    } 
    finally 
    {
    }
};


  return (
<>

 <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
  <Container>
    
    <Navbar.Brand>
      <Link to="/">Home</Link>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

    <Navbar.Collapse id="responsive-navbar-nav">

      {TipoInscripcion?.map((item, index) => {
        return (
        <Nav className="me-auto">
        <Nav.Link key={"nav" + index} as={Link} to={item.tipo} >
        {item.tipo}
        </Nav.Link>
        </Nav>
        )
        })}
      
    </Navbar.Collapse>
  </Container>
</Navbar>

<Outlet />
    
</>

  )
};

export default Layout;
