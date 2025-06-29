import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'modal-popup-angular-18';
import { ReactiveJsonFormsService } from 'reactive-forms-json';
import { MainService } from '../../../core/services/service.service';

@Component({
  selector: 'app-inward-add-page',
  templateUrl: './inward-add-page.component.html',
  styleUrl: './inward-add-page.component.scss'
})
export class InwardAddPageComponent implements OnInit {
  constructor(public form_service: ReactiveJsonFormsService, public service: MainService, public modal: ModalService) { }

  onSubmit(form: any) {
    this.PreviesShow(form)
  }

  ngOnInit(): void {
    this.service.ALLDepotCode().then((res: any) => {
      const depots = res?.data?.map((items: any) => {
        return {
          label: items['depot_name'] + ' | ' + items['depot_code'],
          value: items['depot_code'],
          ...items
        }
      })
      this.service.getGradeList().then((gradeList: any) => {
        this.form_service.buildForm({
          depotCode: {
            type: "SelectOptionObject",
            value: "",
            label: "Choose Depot Code",
            rules: {
              required: false,
            },
            items: depots,
            placeholderText: "Select Depot Code",
            bindLabel: "label",
            ngClass: "field-lastname form-field"
          },
          date_entry: {
            type: "date",
            value: "",
            label: "Entry Date of Form",
            rules: {
              required: false,
            },
            ngClass: "form-controls custom-rounded-input",
            placeholderText: "Entry Date of Form",
          },
          sourcePlant: {
            type: "SelectOption",
            value: "",
            label: "Choose Source Plant",
            rules: {
              required: false,
            },
            items: this.service.SourcePlantData(),
            placeholderText: "Select Source Plant",
            ngClass: "field-lastname form-field"
          },
          invoiceNumber: {
            type: "text",
            inputMode: "numeric",
            pattern: "[0-9]*",
            value: "",
            label: "Invoice Number",
            rules: {
              required: false,
            },
            placeholderText: "Enter Invoice Number",
          },
          invoiceDate: {
            type: "date",
            value: "",
            label: "Invoice Date",
            rules: {
              required: false,
            },
            placeholderText: "Select Invoice Date",
            ngClass: "custom-rounded-input",
          },
          billingTimeOfPlant: {
            type: "time",
            value: "",
            label: "Billing Time Of Plant",
            rules: {
              required: false,
            },
            placeholderText: "Enter Billing Time",
            ngClass: "custom-rounded-input",
          },
          arrivalDateOfTruck: {
            type: "date",
            value: "",
            label: "Arrival Date Of Truck",
            rules: {
              required: false,
            },
            placeholderText: "Select Arrival Date",
            ngClass: "form-controls custom-rounded-input",
          },
          invoiceQty: {
            type: "number",
            value: "",
            label: "Invoice Quantity",
            rules: {
              required: false,
            },
            placeholderText: "Enter Quantity",
          },
          grade: {
            type: "SelectOption",
            value: "",
            label: "Grade",
            rules: {
              required: false,
            },
            items: gradeList,
            placeholderText: "Select Grade",
            ngClass: "field-lastname form-field"
          },
          cutAndTorn: {
            type: "number",
            value: "",
            label: "Cut And Torn",
            rules: {
              required: false,
            },
            placeholderText: "Enter Cut & Torn Qty",
          },
          shortage: {
            type: "number",
            value: "",
            label: "Shortage",
            rules: {
              required: false,
            },
            placeholderText: "Enter Shortage Qty",
          },
          goodStock: {
            type: "number",
            value: "",
            label: "Good Stock",
            rules: {
              required: false,
            },
            placeholderText: "Enter Good Stock Qty",
          },
          unloading: {
            type: "number",
            value: "",
            label: "Unloading",
            rules: {
              required: false,
            },
            placeholderText: "Enter Unloading Qty",
          },
          transphipment: {
            type: "number",
            value: "",
            label: "Transhipment",
            rules: {
              required: false,
            },
            placeholderText: "Is Transhipment?",
          },
          diversion: {
            type: "text",
            value: "",
            label: "Diversion",
            rules: {
              required: false,
            },
           
            placeholderText: "Is Diverted?",
          },
          transporterCompany: {
            type: "SelectOption",
            value: "",
            label: "Transporter Company",
            rules: {
              required: false,
            },
          
            items: ['Yes', 'No'],
            placeholderText: "Enter Transporter Company Name",
              ngClass: "field-lastname form-field"
          },
          vehicleNumber: {
            type: "text",
            value: "",
            label: "Vehicle Number",
            rules: {
              required: false,
            },
            placeholderText: "Enter Vehicle Number",
          },
          reasonForDelay: {
            type: "textarea",
            value: "",
            label: "Reason For Delay",
            rules: {
              required: false,
            },
            placeholderText: "Mention delay reason if any",
          },
          inTimeOfTruck: {
            type: "time",
            value: "",
            label: "In Time Of Truck",
            rules: {
              required: false,
            },
            placeholderText: "Enter In Time",
            ngClass: "custom-rounded-input",
          },
          halting: {
            type: "number",
            value: "",
            label: "Halting (in hrs)",
            rules: {
              required: false,
            },
            placeholderText: "Enter Halting Hours",
          },
          cleared: {
            type: "MatCheckBox",
            value: "halting",
            label: "Cleared",
            rules: {
              required: false,
            },
            items: [{ text: 'halting', value: "halting" }, { text: 'cleared', value: "cleared" }],
            placeholderText: "Cleared?",
          },
          outTimeOfTruck: {
            type: "time",
            value: "",
            label: "Out Time Of Truck",
            rules: {
              required: false,
            },
            placeholderText: "Enter Out Time",
            ngClass: "custom-rounded-input",
          }
        }, "newform").then((res: any) => {
        });
      });
    });
  }

  @ViewChild("showpre", { static: true }) showpre: any;
  PreviesShow(form: FormGroup) {
    this.modal.open(this.showpre, {
      title: "",
      bghide: true,
      headerhide: true
    })
    const FormValue = form?.value;
    this.form_service.buildForm({
      date_entry: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Entry Date of Form",
        rules: {
          required: false,
        },
        ngClass: "form-controls",
        placeholderText: "Entry Date of Form",
      },
      sourcePlant: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Choose Source Plant",
        rules: {
          required: false,
        },
        items: ['Plant A', 'Plant B'],
        placeholderText: "Select Source Plant",
      },
      invoiceNumber: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Invoice Number",
        rules: {
          required: false,
        },
        placeholderText: "Enter Invoice Number",
      },
      invoiceDate: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Invoice Date",
        rules: {
          required: false,
        },
        placeholderText: "Select Invoice Date",
      },
      billingTimeOfPlant: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Billing Time Of Plant",
        rules: {
          required: false,
        },
        placeholderText: "Enter Billing Time",
      },
      arrivalDateOfTruck: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Arrival Date Of Truck",
        rules: {
          required: false,
        },
        placeholderText: "Select Arrival Date",
      },
      invoiceQty: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Invoice Quantity",
        rules: {
          required: false,
        },
        placeholderText: "Enter Quantity",
      },
      grade: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Grade",
        rules: {
          required: false,
        },
        items: ['Grade A', 'Grade B'],
        placeholderText: "Select Grade",
      },
      cutAndTorn: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Cut And Torn",
        rules: {
          required: false,
        },
        placeholderText: "Enter Cut & Torn Qty",
      },
      shortage: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Shortage",
        rules: {
          required: false,
        },
        placeholderText: "Enter Shortage Qty",
      },
      goodStock: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Good Stock",
        rules: {
          required: false,
        },
        placeholderText: "Enter Good Stock Qty",
      },
      unloading: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Unloading",
        rules: {
          required: false,
        },
        placeholderText: "Enter Unloading Qty",
      },
      transphipment: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Transhipment",
        rules: {
          required: false,
        },
        items: [{ text: 'Yes' }, { text: 'No' }],
        placeholderText: "Is Transhipment?",
      },
      diversion: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Diversion",
        rules: {
          required: false,
        },
        items: ['Yes', 'No'],
        placeholderText: "Is Diverted?",
      },
      transporterCompany: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Transporter Company",
        rules: {
          required: false,
        },
        placeholderText: "Enter Transporter Company Name",
      },
      vehicleNumber: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Vehicle Number",
        rules: {
          required: false,
        },
        placeholderText: "Enter Vehicle Number",
      },
      reasonForDelay: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Reason For Delay",
        rules: {
          required: false,
        },
        placeholderText: "Mention delay reason if any",
      },
      inTimeOfTruck: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "In Time Of Truck",
        rules: {
          required: false,
        },
        placeholderText: "Enter In Time",
      },
      halting: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Halting (in hrs)",
        rules: {
          required: false,
        },
        placeholderText: "Enter Halting Hours",
      },
      cleared: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Cleared",
        rules: {
          required: false,
        },
        items: ['Yes', 'No'],
        placeholderText: "Cleared?",
      },
      outTimeOfTruck: {
        type: "LabelShow",
        value: FormValue?.date_entry,
        label: "Out Time Of Truck",
        rules: {
          required: false,
        },
        placeholderText: "Enter Out Time",
      }
    }, "PreviewsInward").then((res: any) => {
    });
  }
  
}
