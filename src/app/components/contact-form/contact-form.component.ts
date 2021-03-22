import { Component, OnInit } from '@angular/core';
import {
  Address,
  Contact,
  Country,
  getCountriesList,
} from '../../api/contact-api-service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  constructor() {}
  contacts: Contact[] = [];
  countriesList: Country[] = [];
  countrySelected: string = '';
  ngOnInit(): void {
    getCountriesList().then((counties) => {
      this.countriesList = counties;
    });
  }
}
