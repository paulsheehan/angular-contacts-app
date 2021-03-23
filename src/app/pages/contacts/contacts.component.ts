import { Component, OnInit } from '@angular/core';
import { Contact, Address, HttpService } from '../../api/contact-api-service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  contacts: Contact[] = [];
  isContactFormOpen: Boolean = false;
  selectedContact = {} as Contact;
  addresses: Address[] = [];

  getContactInformation(): void {
    // GET contacts and addresses
    forkJoin({
      contacts: this.httpService.getAllContacts(),
      addresses: this.httpService.getAllAddresses(),
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
  }
}
