import axios, { AxiosError } from 'axios';
import Botella from '../models/Botella';

interface BotellaApiObject {
    id: number;
    nombre: string;
    marca: string;
    capacidad: string;
    precio: number;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export default class BotellasService {
    private readonly tokenSesion: string;

    private readonly baseUrl: string;

    public constructor() {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if (!tokenSesion) {
            throw new Error('ErrorNoHaySesion');
        }

        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/botellas';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerLista(): Promise<Botella[]> {
        const respuesta = await axios.get(this.baseUrl, { headers: this.headers });
        const listaBotellas = respuesta.data.map((botella: BotellaApiObject) => (
            new Botella(
                botella.id,
                botella.nombre,
                botella.marca,
                botella.capacidad,
                botella.precio,
                new Date(botella.fechaCreacion),
                new Date(botella.fechaActualizacion)
            )
        ));
        return listaBotellas;
    }

    public async obtenerPorId(id: number):Promise<Botella> {
        try{
            const respuesta = await axios.get(
                `${this.baseUrl}/${id}`,
                {headers: this.headers}
            );
            const {
                nombre,
                marca,
                capacidad,
                precio,
                fechaCreacion,
                fechaActualizacion
            } = respuesta.data as BotellaApiObject;
    
            return new Botella(
                id,
                nombre,
                marca,
                capacidad,
                precio,
                new Date(fechaCreacion),
                new Date(fechaActualizacion)
            )
        }
        catch(e){
            if(e instanceof AxiosError && e.response){
                if(e.response.status === 404){
                    throw new Error("ErrorBotellaNoEncontrada")
                }
            }
            throw e;
        }
        
    }

    public async registrar(botella: Botella): Promise<Botella> {
        const respuesta = await axios.post(
            this.baseUrl,
            botella,
            { headers: this.headers }
        );

        const {
            id,
            nombre,
            marca,
            capacidad,
            precio,
            fechaCreacion,
            fechaActualizacion
        } = respuesta.data;

        const nuevaBotella = new Botella(
            id,
            nombre,
            marca,
            capacidad,
            precio,
            new Date(fechaCreacion),
            new Date(fechaActualizacion)
        );

        return nuevaBotella;
    }

    public async actualizar(botella: Botella): Promise<void> {
        await axios.put(
            `${this.baseUrl}/${botella.id}`,
            botella,
            { headers: this.headers }
        );
    }

    public async eliminarBotella(id: number): Promise<void>{
        try {
            const respuesta = await axios.delete(
                `${this.baseUrl}/${id}`,
                { headers: this.headers }
            );

        } catch (e){

            throw e;
        }
    }

    
}
