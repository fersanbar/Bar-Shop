import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Botella from '../models/entities/Botella';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistrarActualizarRequestBody {
    nombre: string;
    marca: string;
    capacidad: string;
    precio: number;
}

export default class BotellasController extends BaseController {
    protected initializeRouter(): void {
        this.router.all('*', Sesion.verificarTokenSesion);

        this.router.get('/', this.consultarTodos);
        this.router.get('/:id', this.buscarPorId);
        this.router.post('/', this.registrar);
        this.router.put('/:id', this.actualizar);
        this.router.delete('/:id', this.eliminar);
    }

    private async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const botellas = await Botella.consultarTodos();
    
            res.status(HttpStatusCodes.OK).json(botellas);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const botella = await Botella.buscarPorId(id);

            res.status(HttpStatusCodes.OK).json(botella);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async registrar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombre,
                marca,
                capacidad,
                precio
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombre || !marca || !capacidad || !precio) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const nuevoUsuario = await Botella.registrar(nombre, marca, capacidad, precio);
    
            res.status(HttpStatusCodes.OK).json(nuevoUsuario);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe una botella con el mismo nombre.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombre,
                marca,
                capacidad,
                precio
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombre || !marca || !capacidad || !precio) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            const id = parseInt(req.params.id);

            const botella = await Botella.buscarPorId(id);

            await botella.actualizar(nombre, marca, capacidad, precio);
    
            res.status(HttpStatusCodes.OK).json(botella);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorBotellaNoEncontrada') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            if (e instanceof Error && e.message === 'ErrorNombreDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe una botella con el mismo nombre.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const botellas = await Botella.eliminar(id);
    
            res.status(HttpStatusCodes.OK).json(botellas);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): BotellasController {
        return new BotellasController(app, '/botellas');
    }
}
