import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Address, Contact, Country, ApiService } from '../../api/api.service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}

  countriesList: Country[] = [];
  countrySelected: string = '';
  hasContact: Boolean = false;
  addresses: Address[] = [];
  @Input() contact = {} as Contact;

  addressFormList = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    avatar: [''],
    addressList: this.formBuilder.array([]),
  });

  onSubmit = (index: number): void => {
    console.log(this.addressList.controls[index]);
    const newAddress = {
      ...this.addressList.controls[index].value,
      contactId: this.contact.id.toString(),
    };
    if (newAddress.id) {
      this.apiService.putAddress(newAddress).subscribe((address: Address) => {
        this.addressList.controls[index].patchValue({
          ...address,
        });
      });
    } else {
      this.apiService.postAddress(newAddress).subscribe((address: Address) => {
        this.addressList.controls[index].patchValue({
          ...address,
        });
      });
    }
  };

  get addressList(): FormArray {
    return this.addressFormList.get('addressList') as FormArray;
  }

  addAddress = (address = {} as Address): void => {
    let addressFormGroup = new FormGroup({
      street1: new FormControl(address.street1, [Validators.required]),
      street2: new FormControl(address.street2, [Validators.required]),
      town: new FormControl(address.town, [Validators.required]),
      country: new FormControl(address.country, [Validators.required]),
      id: new FormControl(address.id),
    });
    console.log(addressFormGroup);
    this.addressList.push(addressFormGroup);
  };

  ngOnInit(): void {
    if (Object.keys(this.contact).length > 0) {
      this.hasContact = true;
      this.addresses = this.contact.addresses.slice();
      for (let i in this.addresses) {
        this.addAddress(this.addresses[i]);
      }
      this.addAddress();
    } else {
      this.hasContact = false;
    }

    // Get countries for form select
    this.apiService.getAllCountries().subscribe((countries: Country[]) => {
      this.countriesList = countries;
    });
  }
}
