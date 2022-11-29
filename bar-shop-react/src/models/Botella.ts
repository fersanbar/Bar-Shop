export default class Botella {
    public id: number;

    public nombre: string;

    public marca: string;

    public capacidad: string;

    public precio: number;

    public fechaCreacion: Date;

    public fechaActualizacion: Date;

    public constructor(
        id: number | undefined,
        nombre: string,
        marca: string,
        capacidad: string,
        precio: number,
        fechaCreacion?: Date,
        fechaActualizacion?: Date
    ) {
        this.id = id as number;
        this.nombre = nombre;
        this.marca = marca;
        this.capacidad = capacidad;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion as Date;
        this.fechaActualizacion = fechaActualizacion as Date;
    }
}
