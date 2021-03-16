const baseUrl = 'http://localhost:3000';

// Typescript Declerations
export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
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

  return request<Array<Contact>>(baseUrl + '/contacts').then((contacts) => {
    return contacts;
  });
}
