import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainService } from '../../../core/services/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'modal-popup-angular-18';

@Component({
  selector: 'app-outward-upload',
  templateUrl: './outward-upload.component.html',
  styleUrl: './outward-upload.component.scss'
})
export class OutwardUploadComponent implements OnInit {
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
  listOfData: any[] = [];
  date = null;
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  loading = false;
  filteredDepots: any = [];
  depots: any = [];
  filterForm: FormGroup = new FormGroup({
    depotDetails: new FormControl({}, [Validators.required]),
  });
  BAGTONData = ['Ton', 'Bag'];
  TableData: any = [];
  PAGE_LIMIT: number = 10;
  PAGE_INDEX: number = 1;
  totalRecords: number = 0;
  isLoadingOne = false;

  constructor(public service: MainService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.service.ALLDepotCode().then((res: any) => {
      console.log(res);
      this.depots = res?.data?.map((items: any) => {
        return {
          label: items['depot_name'] + ' | ' + items['depot_code'],
          value: items['depot_code'],
          ...items
        }
      })
      this.filteredDepots = this.depots
    });
  }

  @ViewChild("UploadUIOpen") UploadUIOpen: any;
  loadData(): void {
    this.modalService.open(this.UploadUIOpen, {
      title: "",
      headerhide: true,
      bghide: true
    })
  }
}
