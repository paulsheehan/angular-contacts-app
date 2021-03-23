import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  Address,
  Contact,
  Country,
  getCountriesList,
  getAddressesList,
} from '../../api/contact-api-service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  constructor() {}
  countriesList: Country[] = [];
  countrySelected: string = '';
  hasContact: Boolean = false;
  addressesList: Address[] = [];
  @Input() contact = {} as Contact;

  getContactAddressList(contact: Contact): void {
    // Get all addresses as Array
    getAddressesList(this.contact.id).then((addresses) => {
      console.log('Returned address list', addresses);
      return addresses;
    });
  }

  ngOnInit(): void {
    // Decide 'Edit' or 'New' contact based on 'contact' property
    if (Object.keys(this.contact).length > 0) {
      this.hasContact = true;

      // get all addresses for this contact
      // this.addresses = this.getContactAddressList(this.contact);
    } else {
      this.hasContact = false;
    }

    // Get countries for form select
    getCountriesList().then((countries) => {
      this.countriesList = countries;
    });
  }
}
