import Botella from '../models/Botella';
import BotellasService from '../services/BotellasService';

export default class RegistrarBotellaTask {
    private botella: Botella;

    public constructor(botella: Botella) {
        this.botella = botella;
    }

    public async execute(): Promise<void> {
        this.validar();
        await new BotellasService().registrar(this.botella);
        
    }

    private validar(): void {
        const { nombre, marca, capacidad, precio } = this.botella;

        if (!nombre || !marca || !capacidad || !precio) {

            throw new Error('ErrorFormularioIncompleto');
        }
    }
}
