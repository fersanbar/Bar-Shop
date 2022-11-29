import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import IniciarSesionUsuarioTask from '../tasks/IniciarSesionUsuarioTask';
import { toast } from 'react-toastify';

export default function FormularioInicioSesion() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const iniciarSesionUsuarioTask = new IniciarSesionUsuarioTask({
            nombreUsuario,
            password
        });

        try {
            await iniciarSesionUsuarioTask.execute();
            navigate('/botellas');
            toast(
                'Sesion iniciada con exito',
                { type: 'success' }
            );
        } catch (e) {
            const mensajeError = (e as Error).message;

            if (mensajeError === 'ErrorFormularioIncompleto') {
                window.alert("Faltan datos por llenar")
            } else {
                window.alert("Ha ocurrido un error")
            }
        }
    }

    function handleNombreUsuarioChange(event: ChangeEvent<HTMLInputElement>) {
        const valorNombreUsuario = event.target.value;
        setNombreUsuario(valorNombreUsuario);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const valorPassword = event.target.value;
        setPassword(valorPassword);
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Label htmlFor="txtNombreUsuario">
                    Nombre de Usuario:
                </Form.Label>
                <Form.Control
                    type="text"
                    id="txtNombreUsuario"
                    name="nombreUsuario"
                    value={nombreUsuario}
                    onChange={handleNombreUsuarioChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtPassword">
                    Password:
                </Form.Label>
                <Form.Control
                    type="password"
                    id="txtPassword"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group >
            <p></p>
            <Form.Group className="text-center">
                <Button
                    className="button-24"
                    role="button"
                    type="submit"
                    variant="primary"
                >
                    Iniciar Sesion
                </Button>
            </Form.Group>
            
        </Form>
    );
}

