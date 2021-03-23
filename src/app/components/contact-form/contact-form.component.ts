import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  Address,
  Contact,
  Country,
  HttpService,
} from '../../api/contact-api-service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  countriesList: Country[] = [];
  countrySelected: string = '';
  hasContact: Boolean = false;
  addressesList: Address[] = [];
  @Input() contact = {} as Contact;

  ngOnInit(): void {
    // Decide 'Edit' or 'New' contact based on 'contact' property
    if (Object.keys(this.contact).length > 0) {
      this.hasContact = true;
      console.log('Contacts:', this.contact);
    } else {
      this.hasContact = false;
    }

    // Get countries for form select
    this.httpService.getAllCountries().subscribe((countries: Country[]) => {
      this.countriesList = countries;
    });
  }
}
