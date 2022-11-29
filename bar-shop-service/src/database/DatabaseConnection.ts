import { DataSource, ObjectLiteral, EntityTarget, Repository } from 'typeorm';
import Botella from '../models/entities/Botella';
import Auto from '../models/entities/Botella';
import Usuario from '../models/entities/Usuario';

export default class DatabaseConnection {
    private dataSource: DataSource;

    private static instance: DatabaseConnection;

    private constructor() {
        this.dataSource = new DataSource({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'bar_shop',
            synchronize: true,
            entities: [Usuario, Botella]
        });
    }

    private get isConnected(): boolean {
        return this.dataSource.isInitialized;
    }

    public getRepository<Entity extends ObjectLiteral>(
        entityTarget: EntityTarget<Entity>
    ): Repository<Entity> {
        return this.dataSource.getRepository(entityTarget);
    }

    private async connect(): Promise<void> {
        await this.dataSource.initialize();
    }

    public static async getConnectedInstance(): Promise<DatabaseConnection> {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }

        if (!DatabaseConnection.instance.isConnected) {
            await DatabaseConnection.instance.connect();
        }

        return DatabaseConnection.instance;
    }
}
