import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'modal-popup-angular-18';
import { ReactiveJsonFormsService } from 'reactive-forms-json';
import { MainService } from '../../../core/services/service.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-inward-add-page',
  templateUrl: './inward-add-page.component.html',
  styleUrl: './inward-add-page.component.scss'
})
export class InwardAddPageComponent implements OnInit {
  constructor(
    public form_service: ReactiveJsonFormsService,
    public service: MainService,
    private notifyService: NotificationService,
    public modal: ModalService) { }

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
            bindLabel: "label"
          },
          date_entry: {
            type: "date",
            value: "",
            label: "Entry Date of Form",
            rules: {
              required: false,
            },
            ngClass: "form-controls",
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
          },
          invoiceNumber: {
            type: "number",
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
          },
          billingTimeOfPlant: {
            type: "datetime",
            value: "",
            label: "Billing Time Of Plant",
            rules: {
              required: false,
            },
            placeholderText: "Enter Billing Time",
          },
          arrivalDateOfTruck: {
            type: "datetime",
            value: "",
            label: "Arrival Date Of Truck",
            rules: {
              required: false,
            },
            placeholderText: "Select Arrival Date",
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
            type: "SelectOption",
            value: "",
            label: "Diversion",
            rules: {
              required: false,
            },
            items: ['Yes', 'No'],
            placeholderText: "Is Diverted?",
          },
          transporterCompany: {
            type: "text",
            value: "",
            label: "Transporter Company",
            rules: {
              required: false,
            },
            placeholderText: "Enter Transporter Company Name",
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
      InvoiceNumber: invoiceNumber
    } = data;

    let bool = true;
    let outTimeOfTruck = (outTimeOf === '--:-- --' || outTimeOf === '') ? 'NA' : outTimeOf;

    // ✅ Check 1: Intime should be less than out time
    const checkedRadio: any = document.querySelector("input[name='truckStatus']:checked");
    const truckStatus = checkedRadio ? checkedRadio.value : undefined;

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
        [`${invoiceQtyNum} < ${totalStock}<br> Please check Invoice Quantity, Good Stock, Shortage, Cut and Torn`],
        null
      );
      bool = false;
    }

    // ✅ Check 3: GoodStock == Unloading + Transphipment + Diversion
    const calculatedStock = Number(unloading) + Number(transphipment) + Number(diversion);

    if (Number(goodStock) !== calculatedStock) {
      this.notifyService.showError(
        [`${goodStock} ≠ ${unloading} + ${transphipment} + ${diversion}<br> Sum of Unloading | Diversion | Transphipment should equal Good Stock`],
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

}
