import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Button, Card } from 'react-bootstrap';
import RegistrarBotellaTask from '../tasks/RegistrarBotellaTask';
import Botella from '../models/Botella';
import { toast } from 'react-toastify';

export default function FormularioRegistrarBotella() {
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [precio, setPrecio] = useState(0);
    const navigate = useNavigate();



    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        
        try {
            const botellaPorRegistrar = new Botella(
                undefined,
                nombre,
                marca,
                capacidad,
                precio
            );

            const registrarBotellaTask = new RegistrarBotellaTask(botellaPorRegistrar);
            await registrarBotellaTask.execute();
            toast(`"${nombre}" fue creado exitosamente!`, { type: 'success' });
            navigate('/botellas');
        } catch (e) {
            const mensajeError = (e as Error).message;

            switch(mensajeError) {
                case 'ErrorFormularioIncompleto':
                    window.alert("Olvidaste llenar todos los campos del formulario")
                    break;
                default:
                    window.alert("Ha ocurrido un error desconocido")
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
                setCapacidad(valor);
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
            <Form onSubmit={handleFormSubmit}>
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
                                type="input"
                                name="precio"
                                min="0"
                                value={precio}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer  className="text-center">
                        <Button 
                            className="button-24"
                            role="button"
                            variant="primary" type="submit">
                            Registrar
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </>
    );
}
