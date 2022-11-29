import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function AppNavbar() {
    const navigate = useNavigate();
    const logo = require("./img/logo.png")
    const exit = require("./img/exit.png")

    function cerrarSesion() {
        localStorage.removeItem('tokenSesion');
        navigate('/inicioSesion');
    }

    return (
        <>
            <Navbar bg='light'>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/botellas">
                    <img
                        src={logo}
                        height='60'
                    />
                    </Navbar.Brand>
                    <Nav>
                    <Nav.Link onClick={cerrarSesion}>
                    <img
                        src={exit}
                        height='30'
                    />
                    </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
