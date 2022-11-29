import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import RegistrarUsuarioTask from '../tasks/RegistrarUsuarioTask';
import { toast } from 'react-toastify';

export default function FormularioRegistro() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [verificarPassword, setVerificarPassword] = useState('');
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const registrarUsuarioTask = new RegistrarUsuarioTask({
            nombreCompleto,
            nombreUsuario,
            password,
            verificarPassword
        });

        try {
            await registrarUsuarioTask.execute();
            navigate('/botellas');
            toast(
                'Cuenta creada con exito',
                { type: 'success' }
            );
        } catch (e) {
            const message = (e as Error).message;

            switch (message) {
                case 'ErrorFormularioIncompleto':
                    window.alert("Olvidaste llenar todos los campos del formulario")
                    break;
                case 'ErrorPasswordsNoCoinciden':
                    window.alert("Las contraseñas no coinciden")
                    break;
                case 'ErrorNombreUsuarioDuplicado':
                    window.alert('El nombre de usuario ya estan en uso')
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido')
            }
        }
    }

    function handleNombreCompletoChange(event: ChangeEvent<HTMLInputElement>) {
        const valorNombreCompleto = event.target.value;
        setNombreCompleto(valorNombreCompleto);
    }

    function handleNombreUsuarioChange(event: ChangeEvent<HTMLInputElement>) {
        const valorNombreUsuario = event.target.value;
        setNombreUsuario(valorNombreUsuario);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const valorPassword = event.target.value;
        setPassword(valorPassword);
    }

    function handleVerificarPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const valorVerificarPassword = event.target.value;
        setVerificarPassword(valorVerificarPassword);
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Label htmlFor="txtNombreCompleto">Nombre Completo:</Form.Label>
                <Form.Control
                    type="text"
                    name="nombreCompleto"
                    id="txtNombreCompleto"
                    value={nombreCompleto}
                    onChange={handleNombreCompletoChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtNombreUsuario">Nombre de Usuario:</Form.Label>
                <Form.Control
                    type="text"
                    name="nombreUsuario"
                    id="txtNombreUsuario"
                    value={nombreUsuario}
                    onChange={handleNombreUsuarioChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtPassword">Password:</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    id="txtPassword"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtVerificarPassword">Verificar Password:</Form.Label>
                <Form.Control
                    type="password"
                    name="verificarPassword"
                    id="txtVerificarPassword"
                    value={verificarPassword}
                    onChange={handleVerificarPasswordChange}
                />
            </Form.Group>
            <p></p>
            <Form.Group className="text-center">
                <Button type="submit" 
                    className="button-24"
                    role="button"
                    variant="primary">Registrarse</Button>
            </Form.Group>
        </Form>
    );
}
