import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Botella from "../models/Botella";
import BotellasService from "../services/BotellasService";
import ActualizarBotellaTask from "../tasks/ActualizarBotellaTask";

interface FormularioActualizarBotellaProps{
    botella: Botella
}

export default function FormularioActualizarBotella({botella}:FormularioActualizarBotellaProps){
    const [nombre, setNombre] = useState(botella.nombre);
    const [marca, setMarca] = useState(botella.marca);
    const [capacidad, setCapacidad] = useState(botella.capacidad);
    const [precio, setPrecio] = useState(botella.precio);
    const idBotella = botella.id;
    const navigate = useNavigate();

    async function handleFormEliminar(
        event: FormEvent
    ){
        event.preventDefault();

        if (window.confirm('¿Deseas eliminar esta botella?')){

            try {
                const botellasService= new BotellasService();
                await botellasService.eliminarBotella(idBotella);
                navigate('/botellas');
            } catch (e) {
                switch((e as Error).message) {
                    case 'ErrorFormularioIncompleto':
                        window.alert('Faltan campos por llenar');
                        break;
                    default:
                        window.alert('Ha ocurrido un error desconocido');
                }
            }
        }  
    }

    async function handleFormActualizar(
        event: FormEvent
    ){
        event.preventDefault();

        try {
            const actualizarBotellaTask = new ActualizarBotellaTask(
                new Botella(idBotella, nombre, marca, capacidad, precio)
            );
            await actualizarBotellaTask.execute();
            navigate('/botellas');
        } catch (e) {
            switch((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    window.alert('Faltan campos por llenar');
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido');
            }
        }
    }
    

    function handleFormControlChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valor = event.target.value;

        switch (event.target.name) {
            case 'nombre':
                setNombre(valor.toUpperCase());
                break;
            case 'marca':
                setMarca(valor.toUpperCase());
                break;
            case 'capacidad':
                setCapacidad(valor.toUpperCase());
                break;
            case 'precio':
                if(valor==""){
                    setPrecio((0));
                }
                else
                {
                    setPrecio(parseFloat(valor));
                }
                break;
            default:
                return;
        }
    }

    return (
        <>
            <Form>
                <Card>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label htmlFor="txtNombre">
                                Nombre
                            </Form.Label>
                            <Form.Control
                                id="txtNombre"
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="txtMarca">
                                Marca
                            </Form.Label>
                            <Form.Control
                                id="txtMarca"
                                type="text"
                                name="marca"
                                value={marca}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="txtCapacidad">
                                Capacidad
                            </Form.Label>
                            <Form.Control
                                id="txtCapacidad"
                                type="text"
                                name="capacidad"
                                value={capacidad}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="txtPrecio">
                                Precio
                            </Form.Label>
                            <Form.Control
                                id="txtPrecio"
                                type="number"
                                name="precio"
                                value={precio}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                    <Row >
                        <Col className="text-center"><Button onClick={handleFormActualizar} className="button-24"
                    role="button" variant="primary" type="submit">
                            Modificar
                        </Button></Col>
                        <Col className="text-center"><Button className="button-24"
                    role="button" onClick={handleFormEliminar}  variant="primary" type="submit">
                            Eliminar
                        </Button></Col>
                    </Row>
                    </Card.Footer>
                </Card>
            </Form>
        </>
    );
}