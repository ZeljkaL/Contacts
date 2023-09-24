import {DataSource, Repository} from 'typeorm';
import {Contact} from './entities/Contact';

export class DatabaseConnection {
  public static instance: DatabaseConnection = new DatabaseConnection();

  private connection: DataSource | undefined = undefined;
  contactRepository: Repository<Contact> | undefined = undefined;

  get valid() {
    return this.connection !== undefined;
  }

  get contactRepositoryValid() {
    return this.contactRepository !== undefined;
  }

  async setup() {
    if (this.valid) {
      return;
    }

    this.connection = new DataSource({
      type: 'react-native',
      database: 'test',
      location: 'default',
      synchronize: true,
      entities: [Contact],
    });

    await this.connection.initialize();

    if (!this.connection.isInitialized) {
      console.log('Connection to local database failed.');
      return;
    }

    this.contactRepository = this.connection.getRepository(Contact);
  }
}
