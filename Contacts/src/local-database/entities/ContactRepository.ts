import {ILike} from 'typeorm';
import {Contact} from './Contact';
import {DatabaseConnection} from '../DatabaseConnection';

export class ContactRepository {
  async save(contacts: Contact[]) {
    if (!DatabaseConnection.instance.contactRepositoryValid) {
      return;
    }

    await DatabaseConnection.instance.contactRepository.upsert(contacts, [
      'id',
    ]);
  }

  async delete(contact: Contact) {
    if (!DatabaseConnection.instance.contactRepositoryValid) {
      return;
    }

    await DatabaseConnection.instance.contactRepository.remove(contact);
  }

  async find(name?: string): Promise<Contact[]> {
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
