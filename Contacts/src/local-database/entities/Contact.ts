import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm/browser';
import {DatabaseConnection} from '../DatabaseConnection';
import {ILike} from 'typeorm';

@Entity({name: 'Contact'})
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: true})
  name: string;

  @Column({type: 'varchar', nullable: true})
  phoneNumber: string;

  @Column({type: 'varchar', nullable: true})
  imagePath: string | undefined;

  constructor(
    id: string,
    name: string,
    phoneNumber: string,
    imagePath?: string,
  ) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.imagePath = imagePath;
  }

  static async save(contact: Contact) {
    if (!DatabaseConnection.instance.contactRepositoryValid) {
      return;
    }

    await DatabaseConnection.instance.contactRepository.save(contact);
  }

  static async find(name?: string): Promise<Contact[]> {
    if (!DatabaseConnection.instance.contactRepositoryValid) {
      return;
    }

    return await DatabaseConnection.instance.contactRepository.find({
      where: {
        ...(name && {name: ILike(`%${name}%`)}),
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
