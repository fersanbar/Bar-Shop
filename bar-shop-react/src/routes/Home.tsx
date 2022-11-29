import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const logo = require("./img/logo.png")

export default function Home() {
    return (
        
        <>
            <h1  className="text-center">
                <img
                    src={logo}
                    height='150'
                />
            </h1>
            <Container fluid> 
                <Outlet />
            </Container>
        </>
    );
}
