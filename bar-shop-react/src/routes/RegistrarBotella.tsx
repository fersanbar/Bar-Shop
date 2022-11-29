import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormularioRegistrarBotella from '../components/FormularioRegistrarBotella';

export default function RegistrarBotella() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }} >
                    <h3  className="text-center">Registrar Botella</h3>
                    <Link to="/botellas">&lt; Regresar</Link>
                    <FormularioRegistrarBotella />
                </Col>
            </Row>
        </>
    );
}
