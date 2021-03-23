const baseUrl = 'http://localhost:3000';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
export class HttpService {
  constructor(private http: HttpClient) {}
  getRequest(url: string): Observable<any> {
    return this.http.get(url);
  }
  getAllContacts(): Observable<any> {
    let url: string = baseUrl + '/contacts';
    return this.getRequest(url);
  }

  getAllCountries(): Observable<any> {
    let url: string = baseUrl + '/countries';
    return this.getRequest(url);
  }

  getAllAddresses(): Observable<any> {
    let url: string = baseUrl + '/addresses';
    return this.getRequest(url);
  }
}
