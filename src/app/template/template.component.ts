import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  @Input() template: {};

  constructor() {}

  ngOnInit() {}

};
