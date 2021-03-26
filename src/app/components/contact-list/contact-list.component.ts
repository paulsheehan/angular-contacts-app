import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../api/api.service';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  constructor() {}
  @Input() contacts: Contact[];
  isContactFormOpen: Boolean = false;
  selectedContact: Object = {};
  @Output() editContactEvent = new EventEmitter<Contact>();
  @Output() deleteContactEvent = new EventEmitter<Contact>();

  editContact(contact: Contact) {
    this.editContactEvent.emit(contact);
  }
  deleteContact(contact: Contact) {
    this.deleteContactEvent.emit(contact);
  }
  ngOnInit(): void {}
}
