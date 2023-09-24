import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm/browser';
import {AxiosResponse} from 'axios';
import {ContactRepository} from './ContactRepository';
import {NetworkService} from '../../networking/NetworkService';

@Entity({name: 'Contact'})
export class Contact {
  private static contactRepository = new ContactRepository();

  @PrimaryGeneratedColumn()
  id: number;

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
    id: number,
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

  static async find(name?: string): Promise<Contact[]> {
    return this.contactRepository.find(name);
  }

  static async fetch(): Promise<Contact[]> {
    const response = await NetworkService.instance.get('/contact');
    this.contactRepository.save(response.data);
    return response.data;
  }

  static async create(contact: Contact): Promise<Contact> {
    const response = await NetworkService.instance.post('/contact', contact);
    this.contactRepository.save([response.data]);
    return response.data;
  }

  static async modify(contact: Contact): Promise<AxiosResponse> {
    this.contactRepository.save([contact]);
    return await NetworkService.instance.put(`/contact/${contact.id}`, contact);
  }

  static async delete(contact: Contact): Promise<AxiosResponse> {
    this.contactRepository.delete(contact);

    return await NetworkService.instance.delete(`/contact/${contact.id}`);
  }
}
