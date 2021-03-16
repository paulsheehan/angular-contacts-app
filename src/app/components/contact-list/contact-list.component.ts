import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../api/contact-api-service';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  constructor() {}
  @Input() contacts: Contact[];
  ngOnInit(): void {}
}
