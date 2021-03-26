import { Component, OnInit } from '@angular/core';
import { Contact, Address, ApiService } from '../../api/api.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
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
  editContact = (contact: Contact): void => {
    this.selectedContact = contact;
    this.openContactForm();
  };
  ngOnInit(): void {
    this.getContactInformation();
    console.log('form', this.form);
  }
}
