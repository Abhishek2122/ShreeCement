import { Component } from '@angular/core';

@Component({
  selector: 'app-inward-upload',
  templateUrl: './inward-upload.component.html',
  styleUrl: './inward-upload.component.scss'
})
export class InwardUploadComponent {
  Tabelheader: string[] = [
    "SR.NO.",
    "ENTRY_DATE",
    "SOURCEPLANT",
    "PLANTINVOICENO",
    "INVOICE_DATE",
    "ARR.DT.TRUCK",
    "INVOICEQTY",
    "GRADE",
    "GOODSTOCK",
    "CUT&TORN",
    "SHORTAGE",
    "UNLOADING",
    "TRANSHIPMENT",
    "DIVERSION",
    "TRANSPORTC0MPANY",
    "VEHICLENO.",
    "REASON DELAY",
    "INTIME",
    "OUTTIME",
    "HALTTIME",
    "DEPOT CODE",
    "EMP ID",
    "COMMENTS"
  ];

}
