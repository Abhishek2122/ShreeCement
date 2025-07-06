import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularModalPopup, ModalService } from 'modal-popup-angular-18';
import { ReactiveJsonFormsService } from 'reactive-forms-json';
import { MainService } from '../../../core/services/service.service';
import { NotificationService } from '../../../core/services/notification.service';
import { InwwardServiceService } from '../../../core/services/inwward-service.service';
import moment from 'moment';

@Component({
  selector: 'app-outward-add-page',
  templateUrl: './outward-add-page.component.html',
  styleUrl: './outward-add-page.component.scss'
})
export class OutwardAddPageComponent implements OnInit {
  SESSION_DATA: any = [];

  constructor(
    public form_service: ReactiveJsonFormsService,
    public service: MainService,
    public InwardService: InwwardServiceService,
    private notifyService: NotificationService,
    public modal: ModalService) { }

  onSubmit(form: any) {
    this.PreviesShow(form)
  }

  ngOnInit(): void {
    this.service.getSessionLogin().subscribe((res: any) => {
      this.SESSION_DATA = { ...res, ...res?.data }
    })

    this.service.ALLDepotCode().subscribe((res: any) => {
      if (res != undefined) {
        const depots = res?.data?.map((items: any) => {
          return {
            label: items['depot_name'] + ' | ' + items['depot_code'],
            value: items['depot_code'],
            ...items
          }
        })
        this.service.getGradeList().subscribe((gradeList: any) => {
          this.service.Dealer_Details().subscribe((Dealer_Details) => {
            console.log(Dealer_Details, "Dealer_Details")
            this.form_service.buildForm({
              Dealer_Name: {
                type: 'SelectOptionObject',
                value: "",
                label: "Choose Dealer Name",
                rules: {
                  required: true,
                },
                items: Dealer_Details?.data,
                bindLabel: "de_name",
                ngClass: "field-lastname form-field",
                callback: (items) => {
                  const Dealer_Code: FormGroup = items?.dynamicFormGroup;
                  Dealer_Code.get("Dealer_Code")?.setValue(items?.value)
                  items['field'][1]['value'] = items?.value
                  console.log(items, "asdasdkasdjadskl")
                }
              },
              Dealer_Code: {
                type: "SelectOptionObject",
                value: "",
                label: "Choose Dealer Code",
                rules: {
                  required: true,
                },
                items: Dealer_Details?.data,
                bindLabel: "de_code",
                ngClass: "field-lastname form-field",
              },
              Depot_Code: {
                type: "SelectOptionObject",
                value: "",
                label: "Choose Depot Code",
                rules: {
                  required: true,
                },
                items: depots,
                placeholderText: "",
                bindLabel: "label",
                ngClass: "field-lastname form-field"
              },
              Entry_Date: {
                type: "date",
                value: moment().format("YYYY-MM-DD"),
                label: "Entry Date of Form",
                rules: {
                  required: true,
                },
                ngClass: "form-controls custom-rounded-input",
                placeholderText: "Entry Date of Form",
              },

              InvoiceNumber: {
                type: "text",
                pattern: "[0-9]*",
                value: "",
                label: "Plant Invoice No.",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Plant Invoice No.",
              },
              InvoiceDate: {
                type: "date",
                value: "",
                label: "Plant Invoice Date",
                rules: {
                  required: true,
                },
                placeholderText: "Select Plant Invoice Date",
                ngClass: "custom-rounded-input",
              },
              InvoiceQty: {
                type: "text",
                pattern: "[0-9]*",
                value: "",
                label: "Invoice Quantity (in Bags)",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Quantity (in Bags)",
              },
              Grade: {
                type: "SelectOptionObject",
                value: "",
                label: "Grade",
                rules: {
                  required: true,
                },
                items: gradeList,
                bindLabel: "Grade_Name",
                ngClass: "field-lastname form-field"
              },
              Unloading: {
                type: "number",
                value: "",
                label: "Unloading (in Bags)",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Unloading Qty (in Bags)",
              },
              Transphipment: {
                type: "number",
                value: "",
                label: "Transhipment (in Bags)",
                rules: {
                  required: true,
                },
                placeholderText: "Is Transhipment (in Bags)",
              },
              Diversion: {
                type: "number",
                value: "",
                label: "Diversion (in Bags)",
                rules: {
                  required: true,
                },

                placeholderText: "Is Diverted (in Bags)?",
              },
              TruckArrangedBy: {
                type: "SelectOption",
                value: "",
                label: "Truck Arranged By",
                rules: {
                  required: true,
                },
                items: ['Plant Truck', 'CFA', 'Dealer'],
                placeholderText: "Truck Arranged By",
              },
              VehicleNumber: {
                type: "text",
                value: "",
                label: "Vehicle Number",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Vehicle Number",
              },
              DriverName: {
                type: "text",
                value: "",
                label: "Driver Name",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Driver Name",
              },
              DriverMobileNumber: {
                type: "number",
                value: "",
                label: "Driver Mobile Number",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Vehicle Number",
              },
              InTimeOfTruck: {
                type: "time",
                value: "",
                label: "In Time Of Truck",
                rules: {
                  required: true,
                },
                placeholderText: "Enter In Time",
                ngClass: "custom-rounded-input",
              },
              OutTimeOfTruck: {
                type: "time",
                value: "",
                label: "Out Time Of Truck",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Out Time",
                ngClass: "custom-rounded-input",
              },
              InvoiceValue: {
                type: "text",
                value: "",
                label: "Invoice Value",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Invoice Value",
              },
              EwayDate: {
                type: "date",
                value: "",
                label: "Eway Date",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Eway Date",
              },
              EwayNo: {
                type: "text",
                value: "",
                label: "Eway No.",
                rules: {
                  required: true,
                },
                placeholderText: "Enter Eway No.",
              },
            }, "newform").then((res: any) => {
            });
          })

        });
      }
    });
  }

  @ViewChild("showpre", { static: true }) showpre: any;
  showpreClose?: AngularModalPopup;
  FormGroupObj!: FormGroup;
  PreviesShow(form: FormGroup) {
    this.FormGroupObj = form;
    const FormValue = form?.value;
    if (this.checking(FormValue)) {
      this.form_service.dynamicFormGroup['newform']?.disable()
      this.showpreClose = this.modal.open(this.showpre, {
        title: "",
        bghide: true,
        headerhide: true
      })
    }
  }

  checking(data: any): boolean {
    const invoiceQty = Number(data['InvoiceQty']) || 0;
    const unloading = Number(data['Unloading']) || 0;
    const transphipment = Number(data['Transphipment']) || 0;
    const diversion = Number(data['Diversion']) || 0;
    const inTimeOfTruck = data['InTimeOfTruck'] || '';
    const outTimeOf = data['OutTimeOfTruck'] || '';

    let outTimeOfTruck = (outTimeOf === '--:-- --' || outTimeOf === '') ? 'NA' : outTimeOf;

    let isValid = true;

    // Check time comparison (only if outTimeOfTruck is not 'NA')
    if (outTimeOfTruck !== 'NA' && inTimeOfTruck > outTimeOfTruck) {
      this.notifyService.showError(['In-time should be less than Out-time'], null);
      isValid = false;
    }

    const total = (unloading + transphipment + diversion).toFixed(2);
    const expected = invoiceQty.toFixed(2);

    if (expected !== total) {
      this.notifyService.showError([
        `${expected} | ${total}<br> Please check the Value of Invoice Quantity | Good Stock | Shortage | Cut and Torn`
      ], null);
      isValid = false;
    }

    return isValid;
  }


  onSubmitApi(event: FormGroup) {
    const formValue = event?.value
    const storeDate = this.getMonthYear(formValue['InvoiceDate']);
    formValue['Month'] = storeDate.Month;
    formValue['Year'] = storeDate.Year;
    formValue['Day'] = storeDate.Day;
    formValue['Emp_Id'] = this.SESSION_DATA['Emp_Id'];
    formValue['Today'] = formValue['Day'];
    formValue['Depot_Code'] = formValue['Depot_Code']['depot_code']
    formValue['Grade'] = formValue['Grade']['Grade_Name']
    this.service.InserOutwardData(formValue).subscribe((res: any) => {
      if (res?.response?.status == true) {
        this.notifyService.showSuccess('New Data Insert', res?.response?.message);
        this.showpreClose?.close(this.showpreClose.RAMDOM_ID);
        this.form_service.dynamicFormGroup['newform']?.enable();
      }
    }, (err: any) => {
      this.notifyService.showSuccess('Error', err?.error?.message);
    })
  }

  getMonthYear(date: string) {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.toLocaleDateString('default', { weekday: 'long' });
    const year = dateObj.getUTCFullYear();
    return { Month: month, Year: year, Day: day }
  }

  dateDiff(date1: any, date2: any) {
    var date1_ts = Date.parse(date1);
    var date2_ts = Date.parse(date2);
    var diff = date2_ts - date1_ts;
    return Math.round(diff / 86400000);
  }

  EnabledForm() {
    this.form_service.dynamicFormGroup['newform']?.enable();
    this.showpreClose?.close(this.showpreClose.RAMDOM_ID)
  }

  test:any=''
  changeValue(event:any){
    console.log(event)
  }
}
