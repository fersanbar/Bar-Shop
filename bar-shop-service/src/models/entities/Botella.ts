import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'botellas' })
export default class Botella {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 120, nullable: false, unique: true })
    public nombre: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public marca: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public capacidad: string;

    @Column({ type: 'double', nullable: false })
    public precio: number;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    private constructor(
        id: number | undefined,
        nombre: string,
        marca: string,
        capacidad: string,
        precio: number,
        fechaCreacion: Date,
        fechaActualizacion: Date
    ) {
        this.id = <number>id;
        this.nombre = nombre;
        this.marca = marca;
        this.capacidad = capacidad;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public async actualizar(
        nombre: string,
        marca: string,
        capacidad: string,
        precio: number
    ): Promise<void> {
        this.nombre = nombre;
        this.marca = marca;
        this.capacidad = capacidad;
        this.precio = precio;
        this.fechaActualizacion = new Date();

        const listaUsuarios = await Botella.obtenerListaBotellas();

        try {
            await listaUsuarios.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }
    }

    public static async consultarTodos(): Promise<Botella[]> {
        const listaUsuarios = await Botella.obtenerListaBotellas();
        return listaUsuarios.find();
    }

    public static async buscarPorId(id: number): Promise<Botella> {
        const listaUsuarios = await Botella.obtenerListaBotellas();

        const botella = await listaUsuarios.findOneBy({ id });

        if (!botella) {
            throw new Error('ErrorAutoNoEncontrado');
        }

        return botella;
    }

    public static async registrar(
        nombre: string,
        marca: string,
        capacidad: string,
        precio: number
    ): Promise<Botella> {
        const listaUsuarios = await Botella.obtenerListaBotellas();

        const fechaCreacion = new Date();

        const botella = new Botella(
            undefined,
            nombre,
            marca,
            capacidad,
            precio,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await listaUsuarios.save(botella);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }

        return botella;
    }

    public static async eliminar(id: number): Promise<void> {
        const listaUsuarios = await Botella.obtenerListaBotellas();
        await listaUsuarios.delete(id);
    }

    private static async obtenerListaBotellas(): Promise<Repository<Botella>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Botella);
    }
}
