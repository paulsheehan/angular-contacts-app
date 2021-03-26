import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// Typescript Declerations
export type Address = {
  street1: string;
  street2: string;
  town: string;
  country: string;
  contactId: string;
  id: number;
};

export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  addresses: Address[];
};

export type Country = {
  iso2: string;
  name: string;
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000';

  getRequest(url: string): Observable<any> {
    return this.http.get(url);
  }
  postRequest(
    url: string,
    payload: Object,
    options: Object = {}
  ): Observable<any> {
    return this.http.post(
      url,
      {
        ...payload,
      },
      options
    );
  }

  getAllContacts(): Observable<any> {
    let url: string = this.baseUrl + '/contacts';
    return this.getRequest(url);
  }
  getAllCountries(): Observable<any> {
    let url: string = this.baseUrl + '/countries';
    return this.getRequest(url);
  }
  getAllAddresses(): Observable<any> {
    let url: string = this.baseUrl + '/addresses';
    return this.getRequest(url);
  }
  postAddress(address: Address): Observable<Address> {
    let url: string = this.baseUrl + '/addresses';
    return this.postRequest(url, address);
  }
}
