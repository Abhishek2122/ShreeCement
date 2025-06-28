import { Component, OnInit } from '@angular/core';
import { ReactiveJsonFormsService } from 'json-reactive-form-angular-18';

@Component({
  selector: 'inward-add-page',
  templateUrl: './inward-add-page.component.html',
  styleUrl: './inward-add-page.component.scss'
})
export class InwardAddPageComponent implements OnInit {
  constructor(public form_service: ReactiveJsonFormsService) {

  }

  ngOnInit(): void {
  //  setTimeout(() => {
  //    this.form_service.buildForm({
  //     name: {
  //       type: "text",
  //       value: "",
  //       label: "your label name",
  //       rules: {
  //         required: true,
  //       },
  //       placeholderText: "",
  //       maxLength: 6
  //     },
  //     lastname: {
  //       type: "text",
  //       value: "",
  //       label: "your last name",
  //       rules: {
  //         required: true,
  //       },
  //       placeholderText: "",
  //       maxLength: 6
  //     }
  //   }, "newform").then((res: any) => {
  //   });
  //  }, 100);
  }

  onSubmit(form: any) {
    console.log(form, 'onSubmit');
  }
}
