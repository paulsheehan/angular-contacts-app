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
  openContactForm = (): void => {
    this.isContactFormOpen = true;
  };
  ngOnInit(): void {
    getAllContacts().then((contacts) => {
      this.contacts = contacts;
    });
  }
}
