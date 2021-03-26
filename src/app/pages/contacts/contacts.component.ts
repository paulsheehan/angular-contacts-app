import { Component, OnInit } from '@angular/core';
import { Contact, Address, ApiService } from '../../api/api.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  contacts: Contact[] = [];
  isContactFormOpen: Boolean = false;
  selectedContact = {} as Contact;
  addresses: Address[] = [];
  form: FormGroup = new FormGroup({
    contactName: new FormControl('', Validators.required),
  });

  getContactInformation(): void {
    // GET contacts and addresses
    forkJoin({
      contacts: this.apiService.getAllContacts(),
      addresses: this.apiService.getAllAddresses(),
    }).subscribe(({ contacts, addresses }) => {
      // Add addresses to contacts by contactId
      this.contacts = contacts.map((contact: Contact) => {
        return {
          ...contact,
          addresses: addresses.filter((address: Address) => {
            return contact.id.toString() === address.contactId;
          }),
        };
      });
    });
  }

  openContactForm = (): void => {
    this.isContactFormOpen = true;
  };
  newContact = (): void => {
    let name = this.form.controls.contactName.value;
    let firstName = name.split(' ')[0];
    let secondName = name.split(' ').slice(1).join(' ');
    const contact = {
      first_name: firstName,
      last_name: secondName,
      avatar: '',
      addresses: [],
      id: this.contacts.length,
    };

    this.apiService.postContact(contact).subscribe((contact: Contact) => {
      this.contacts.push(contact);
      this.selectedContact = contact;
      this.openContactForm();
    });
  };
  editContact = (contact: Contact): void => {
    this.selectedContact = contact;
    this.openContactForm();
  };
  ngOnInit(): void {
    this.getContactInformation();
  }
}
