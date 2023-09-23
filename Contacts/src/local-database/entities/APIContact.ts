import {Contact} from './Contact';

export interface APIContactData {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
}

interface APIContactAddressGeo {
  lat: string;
  lng: string;
}

interface APIContactAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: APIContactAddressGeo;
}

export class APIContact {
  private id: string;
  private name: string;
  private username: string;
  private email: string;
  private address: APIContactAddress;
  private phone: string;
  private website: string;

  constructor(data: APIContactData) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.address = data.address;
    this.phone = data.phone;
    this.website = data.website;
  }

  serialize(): Contact {
    return new Contact(
      this.id,
      this.name,
      this.phone,
      `${this.address.city} ${this.address.street}`,
      this.email,
    );
  }
}
