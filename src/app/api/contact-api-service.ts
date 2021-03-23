const baseUrl = 'http://localhost:3000';

// Typescript Declerations
export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type Address = {
  street1: string;
  street2: string;
  town: string;
  country: string;
  contactId: string;
  id: number;
};

export type Country = {
  iso2: string;
  name: string;
};

function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

// Api functions
export function getAllContacts(): Promise<Array<Contact>> {
  let url = baseUrl + '/contacts';

  return request<Array<Contact>>(url).then((contacts) => {
    return contacts;
  });
}

export function getCountriesList(): Promise<Array<Country>> {
  let url = baseUrl + '/countries';

  return request<Array<Country>>(url).then((countries) => {
    return countries;
  });
}

export function getAddressesList(id: number): Promise<Array<Address>> {
  let url = baseUrl + '/addresses/' + id;

  return request<Array<Address>>(url).then((addresses) => {
    return addresses;
  });
}
