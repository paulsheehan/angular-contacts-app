import { Component, OnInit } from '@angular/core';
import { Contact, getAllContacts } from '../../api/contact-api-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  contacts: Contact[] = [];

  ngOnInit(): void {
    // Get Contacts
    getAllContacts().then((contacts) => {
      this.contacts = contacts;
    });
  }
}
