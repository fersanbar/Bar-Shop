import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaBotellas from '../components/TablaBotellas';

export default function ListaBotellas() {
    const navigate = useNavigate();

    function navegarRegistrarBotella() {
        navigate('/botellas/registrar');
    }

    return (
        <>
            <Container className="lista-botellas">
                <div  className="text-center">
                    <h3  className="text-center titulo">Botellas</h3>
                    <Button
                        className="button-24"
                        role="button"
                        variant="primary"
                        onClick={navegarRegistrarBotella}
                    >
                        Registrar Botella
                    </Button>
                </div>
                <p></p>
                <TablaBotellas/>
            </Container>
        </>
    );
}
