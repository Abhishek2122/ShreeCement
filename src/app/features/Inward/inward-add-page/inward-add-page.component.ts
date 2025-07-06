import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularModalPopup, ModalService } from 'modal-popup-angular-18';
import { ReactiveJsonFormsService } from 'reactive-forms-json';
import { MainService } from '../../../core/services/service.service';
import { NotificationService } from '../../../core/services/notification.service';
import { InwwardServiceService } from '../../../core/services/inwward-service.service';
import moment from 'moment';

@Component({
  selector: 'app-inward-add-page',
  templateUrl: './inward-add-page.component.html',
  styleUrl: './inward-add-page.component.scss'
})
export class InwardAddPageComponent implements OnInit {
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
          this.form_service.buildForm({
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
            SourcePlant: {
              type: "SelectOption",
              value: "",
              label: "Choose Source Plant",
              rules: {
                required: true,
              },
              items: this.service.SourcePlantData(),
              ngClass: "field-lastname form-field"
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
            billingTimeOfPlant: {
              type: "time",
              value: "",
              label: "Billing Time Of Plant",
              rules: {
                required: true,
              },
              placeholderText: "Enter Billing Time",
              ngClass: "custom-rounded-input",
            },
            ArrivalDateOfTruck: {
              type: "date",
              value: "",
              label: "Arrival Date Of Truck",
              rules: {
                required: true,
              },
              placeholderText: "Select Arrival Date",
              ngClass: "form-controls custom-rounded-input",
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
            CutAndTorn: {
              type: "number",
              value: "",
              label: "Cut And Torn (in Bags)",
              rules: {
                required: true,
              },
              placeholderText: "Enter Cut & Torn Qty (in Bags)",
            },
            Shortage: {
              type: "number",
              value: "",
              label: "Shortage (in Bags)",
              rules: {
                required: true,
              },
              placeholderText: "Enter Shortage Qty (in Bags)",
            },
            GoodStock: {
              type: "number",
              value: "",
              label: "Good Stock (in Bags)",
              rules: {
                required: true,
              },
              placeholderText: "Enter Good Stock Qty (in Bags)",
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
            TransporterCompany: {
              type: "SelectOption",
              value: "",
              label: "Transporter Company",
              rules: {
                required: true,
              },
              items: this.InwardService.getTransporterCompanyName(),
              ngClass: "field-lastname form-field"
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
            cleared: {
              type: "MatCheckBox",
              value: "",
              label: "Truck Status",
              rules: {
                required: true,
              },
              items: [{ text: 'halting', value: "halting" }, { text: 'cleared', value: "cleared" }],
              placeholderText: "Truck Status:?",
              callback: (items: any) => {
                console.log(items, "asdaskdsajdksadhadjkh")
                const FIELDS_DATA = this.form_service.FIELDS_DATA['newform'];
                if (items?.value == "halting") {
                  FIELDS_DATA[FIELDS_DATA.length - 1]['type'] = 'text';
                  FIELDS_DATA[FIELDS_DATA.length - 1]['value'] = 'NA'
                } else {
                  FIELDS_DATA[FIELDS_DATA.length - 1]['type'] = 'time';
                  FIELDS_DATA[FIELDS_DATA.length - 1]['value'] = ''
                }
              }
            },
            reasonForDelay: {
              type: "textarea",
              value: "",
              label: "Reason for Delay/Normal Time",
              rules: {
                required: true,
              },
              placeholderText: "Mention delay reason if any",
            },
          }, "newform").then((res: any) => {
          });
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
    const {
      ArrivalDateOfTruck: arrivalDateOfTruck,
      InvoiceQty: invoiceQty,
      Shortage: shortage,
      CutAndTorn: cutAndTorn,
      GoodStock: goodStock,
      Unloading: unloading,
      Transphipment: transphipment,
      Diversion: diversion,
      InTimeOfTruck: inTimeOfTruck,
      OutTimeOfTruck: outTimeOf,
      InvoiceNumber: invoiceNumber,
      cleared: cleared
    } = data;

    let bool = true;
    let outTimeOfTruck = (outTimeOf === '--:-- --' || outTimeOf === '') ? 'NA' : outTimeOf;

    // ✅ Check 1: Intime should be less than out time
    const truckStatus = cleared ? cleared : undefined;

    if (
      inTimeOfTruck &&
      outTimeOfTruck !== 'NA' &&
      inTimeOfTruck > outTimeOfTruck &&
      new Date(arrivalDateOfTruck).getDay() === new Date().getDay() &&
      truckStatus === 'cleared'
    ) {
      this.notifyService.showError(['Intime should be less than out time'], null);
      bool = false;
    }

    // ✅ Check 2: InvoiceQty ≥ (Shortage + CutAndTorn + GoodStock)
    const totalStock = Number(shortage) + Number(cutAndTorn) + Number(goodStock);
    const invoiceQtyNum = Number(invoiceQty);

    if (invoiceQtyNum < totalStock) {
      this.notifyService.showError(
        [`${invoiceQtyNum} < ${totalStock}\n Please check Invoice Quantity, Good Stock, Shortage, Cut and Torn`],
        null
      );
      bool = false;
    }

    // ✅ Check 3: GoodStock == Unloading + Transphipment + Diversion
    const calculatedStock = Number(unloading) + Number(transphipment) + Number(diversion);

    if (Number(goodStock) !== calculatedStock) {
      this.notifyService.showError(
        [`${goodStock} = ${unloading} + ${transphipment} + ${diversion} \n Sum of Unloading | Diversion | Transphipment should equal Good Stock`],
        null
      );
      bool = false;
    }

    // ✅ Check 4: Truck status is selected
    if (truckStatus === undefined) {
      this.notifyService.showError(['Please check truck status is empty!'], null);
      bool = false;
    }

    // ✅ Check 5: Invoice Number should be exactly 10 digits
    if (!invoiceNumber || invoiceNumber.length !== 10) {
      this.notifyService.showError(['Invoice number should be exactly 10 digits!'], null);
      bool = false;
    }

    return bool;
  }

  onSubmitApi(event: FormGroup) {
    const formValue = event?.value
    const storeDate = this.getMonthYear(formValue['InvoiceDate']);
    formValue['Month'] = storeDate.Month;
    formValue['Year'] = storeDate.Year;
    formValue['Day'] = storeDate.Day;
    formValue['Emp_Id'] = this.SESSION_DATA['Emp_Id'];
    formValue['Month'] = formValue['Month'];
    formValue['Year'] = formValue['Year'];
    formValue['Today'] = formValue['Day'];
    formValue['Depot_Code'] = formValue['Depot_Code']['depot_code']
    formValue['Grade'] = formValue['Grade']['Grade_Name']
    if (formValue["OutTimeOfTruck"] !== "" && formValue["OutTimeOfTruck"] !== "NA") {
      const arrivalDate = formValue["ArrivalDateOfTruck"];
      const entryDate = formValue["entryDate"];
      const inTime = formValue["InTimeOfTruck"];
      const outTime = formValue["OutTimeOfTruck"];
      const datediff: number = this.dateDiff(arrivalDate, entryDate); // assuming it returns number of days
      const [inHours, inMinutes] = inTime.split(':').map(Number);
      const [outHours, outMinutes] = outTime.split(':').map(Number);
      const haltMinutes = (datediff * 24 * 60) + (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
      const haltHour = (haltMinutes / 60).toFixed(2);
      formValue["haltHour"] = (haltHour);
      formValue["clearDateOfTruck"] = (entryDate);
    } else {
      const haltHour = 0;
      formValue["haltHour"] = (haltHour.toString());
      formValue["clearDateOfTruck"] = ('2000-01-01');
      formValue["OutTimeOfTruck"] = ('halting');
    }
    formValue['HaltHour'] = formValue['haltHour'];
    formValue['ClearDateOfTruck'] = formValue["clearDateOfTruck"];
    this.service.InsertInwardData(formValue).subscribe((res: any) => {
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
}
