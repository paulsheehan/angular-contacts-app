import { Component, OnInit } from '@angular/core';
import { Contact, getAllContacts } from '../../api/contact-api-service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor() {}
  contacts: Contact[] = [];
  isContactFormOpen: Boolean = false;
  selectedContact = {} as Contact;
  openContactForm = (): void => {
    this.isContactFormOpen = true;
  };
  editContact = (contact: Contact): void => {
    this.selectedContact = contact;
    this.openContactForm();
  };
  ngOnInit(): void {
    getAllContacts().then((contacts) => {
      this.contacts = contacts;
    });
  }
}
