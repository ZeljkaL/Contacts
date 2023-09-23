import {ILike} from 'typeorm';
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm/browser';
import {DatabaseConnection} from '../DatabaseConnection';
import {APIService} from '../../api/APIService';
import {APIContact, APIContactData} from './APIContact';

@Entity({name: 'Contact'})
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: true})
  name: string;

  @Column({type: 'varchar', nullable: true})
  phone: string;

  @Column({type: 'varchar', nullable: true})
  address: string;

  @Column({type: 'varchar', nullable: true})
  email: string;

  @Column({type: 'varchar', nullable: true})
  imagePath: string | undefined;

  constructor(
    id: string,
    name: string,
    phone: string,
    address: string,
    email: string,
    imagePath?: string,
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.email = email;
    this.imagePath = imagePath;
  }

  static async save(contacts: Contact[]) {
    if (!DatabaseConnection.instance.contactRepositoryValid) {
      return;
    }

    await DatabaseConnection.instance.contactRepository.upsert(contacts, [
      'id',
    ]);
  }

  static async delete(contact: Contact) {
    if (!DatabaseConnection.instance.contactRepositoryValid) {
      return;
    }

    await DatabaseConnection.instance.contactRepository.remove(contact);
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

  static async fetch(): Promise<Contact[]> {
    const response = await APIService.instance.genericRequest('/users');
    const apiContacts = response.data.map((item: APIContactData) => {
      return new APIContact(item);
    });

    return apiContacts.map((apiContact: APIContact) => apiContact.serialize());
  }
}
