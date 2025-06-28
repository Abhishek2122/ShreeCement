import { Component, OnInit } from '@angular/core';
import { ReactiveJsonFormsService } from 'reactive-forms-json';

@Component({
  selector: 'app-inward-add-page',
  templateUrl: './inward-add-page.component.html',
  styleUrl: './inward-add-page.component.scss'
})
export class InwardAddPageComponent implements OnInit {
  constructor(public form_service: ReactiveJsonFormsService) { }

  onSubmit(form: any) {
    console.log(form, 'onSubmit');

    if (form.lastname === 'Select team size') {
      alert('Please select a valid team size');
      return;
    }
    
  }

  ngOnInit(): void {
    this.form_service.buildForm(
      {
        name: {
          type: "text",
          value: "",
          label: "Your Label Name",
          rules: { required: true },
          placeholderText: "",
          maxLength: 6,
          ngClass: "col-md-6 form-field"
        },
        lastname: {
          type: "SelectOption",
          value: "Select team size",
          label: "Your Last Name",
          rules: { required: true },
          items: ["Select team size", "add", "sdsdsds"],
          ngClass: "col-md-6 field-lastname form-field"
        },
        lastnames: {
          type: "SelectOption",
          value: "Select team size",
          label: "Your Last Name",
          rules: { required: true },
          items: ["Select team size", "add", "sdsdsds"],
          ngClass: "col-md-6 field-lastname form-field"
        },
        lastnamee: {
          type: "SelectOption",
          value: "Select team size",
          label: "Your Last Name",
          rules: { required: true },
          items: ["Select team size", "add", "sdsdsds"],
          ngClass: "col-md-6 field-lastname form-field"
        },
        lastnamea: {
          type: "SelectOption",
          value: "Select team size",
          label: "Your Last Name",
          rules: { required: true },
          items: ["Select team size", "add", "sdsdsds"],
          ngClass: "col-md-6 field-lastname form-field"
        },
        lastnamess: {
          type: "SelectOption",
          value: "Select team size",
          label: "Your Last Name",
          rules: { required: true },
          items: ["Select team size", "add", "sdsdsds"],
          ngClass: "col-md-6 field-lastname form-field"
        }
      },
      "newform"
    ).then((res: any) => {});
  }
  
}
