import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainService } from '../../../core/services/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularModalPopup, ModalService } from 'modal-popup-angular-18';
import moment from 'moment';
import { HttpEventType } from '@angular/common/http';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-inward-upload',
  templateUrl: './inward-upload.component.html',
  styleUrl: './inward-upload.component.scss'
})
export class InwardUploadComponent implements OnInit {
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
    depotDetails: new FormControl({}, []),
  });
  BAGTONData = ['Ton', 'Bag'];
  TableData: any = [];
  PAGE_LIMIT: number = 10;
  PAGE_INDEX: number = 1;
  totalRecords: number = 0;
  isLoadingOne = false;
  PLANT_CODE: any = { '1303': 'KADAPA', '1301': 'DALMIAPURAM', '1302': 'ARILUR', '1300': 'BELGULUM/YADWAD' }
  MATERIAL_NO: Array<{ grade: string; code: string, description: string }> = [];
  MATERIAL_NO_DUMP: Array<{ grade: string; code: string, description: string }> = [];
  GradeNotFound: any = [];
  STATIC_UNIQUE_ID: any = this.uniqueID() + '_' + (new Date().getTime());
  GRADE_LIST_OBJECT: any = [];
  SESSION_DATA: any = [];
  IN_VALID_DATE: boolean = false;

  constructor(
    public service: MainService,
    private notifyService: NotificationService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.service.getGradeList().then((res) => {
      for (let index = 0; index < this.service.GRADE_LIST.length; index++) {
        this.GRADE_LIST_OBJECT.push(this.service.GRADE_LIST[index]);
      }
    });
    this.service.getSessionLogin().subscribe((res: any) => {
      this.SESSION_DATA = { ...res, ...res?.data }
    })
    this.service.getGradeListData().then((res: any) => {
      const updatedGrades = this.service.updateGrades(this.MATERIAL_NO_DUMP, res);
      this.MATERIAL_NO = updatedGrades;
    })
    this.service.ALLDepotCode().then((res: any) => {
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
  UploadUIOpen_Close?: AngularModalPopup;
  loadData(): void {
    this.UploadUIOpen_Close = this.modalService.open(this.UploadUIOpen, {
      title: "",
      headerhide: true,
      bghide: true
    })
  }

  uploadCompleted(event: any) {
    this.IN_VALID_DATE = false;
    this.UploadUIOpen_Close?.close(this.UploadUIOpen_Close?.RAMDOM_ID ?? 0);
    this.TableData = event?.uploadQueue[0]?.data?.result?.map((items: any) => {
      const plant_code: any = this.PLANT_CODE[(items['Plant'])];
      let GRADE_NAME: any = this.gradeIndexOf(items['Material Desc.'])
      let GradeName = ''
      const FILTER_MATERIAL_DATA: any = this.MATERIAL_NO.filter((item: any) => item?.material_no === items['Material No'])
      if (FILTER_MATERIAL_DATA?.length != 0) {
        GradeName = (FILTER_MATERIAL_DATA[0]?.Grade_Name)
      } else if (GRADE_NAME != undefined && GRADE_NAME != null && GRADE_NAME != '') {
        GradeName = (GRADE_NAME)
      } else {
        GradeName = ("Not Grade found")
        this.GradeNotFound.push(`Error: Grade "${items['Material No']} | ${items['Material Desc.']}" not found in the existing list.`)
      }
      const UNLOADING = items['Expences Type'] == 'ROAD-Unloading Chg' && (items['Sto.Location'] == 'SA01' ||
        items['Sto.Location'] == 'CT01' || items['Sto.Location'] == 'DM01') ?
        items['GRN qty'] : 0;
      const Transphipment = items['Expences Type'] == 'Transhipment Charges' && (items['Sto.Location'] == 'SA01' ||
        items['Sto.Location'] == 'CT01' || items['Sto.Location'] == 'DM01') ?
        items['GRN qty'] : 0;
      const Diversion = items['Expences Type'] == 'Diversion charges' && (items['Sto.Location'] == 'SA01' ||
        items['Sto.Location'] == 'CT01' || items['Sto.Location'] == 'DM01') ?
        items['GRN qty'] : 0;
      let deleteflag = 0;
      if (items['Expences Type'] == 'Diversion charges' && (items['Sales Order Quantity']).toString() == 'NF') {
        deleteflag = 1
      } else {
        deleteflag = 0;
      }
      const haltHour: any = 'NA'
      const storeDate = this.service.getMonthYear2(items['GRN_Date']);
      const session = this.SESSION_DATA;
      return {
        Entry_Date: items['GRN_Date'],
        SourcePlant: plant_code,
        InvoiceNumber: items['Invoice No'],
        InvoiceDate: items['Invoice Date'],
        ArrivalDateOfTruck: items['Arrival date'],
        InvoiceQty: (parseFloat(items['GRN qty']) * 20).toFixed(2),
        Grade: GradeName,
        GoodStock: items['Sto.Location'] == 'SA01' ? (parseFloat(items['GRN qty']) * 20).toFixed(2) : 0,
        CutAndTorn: items['Sto.Location'] == 'DM01' ? (parseFloat(items['GRN qty']) * 20).toFixed(2) : 0,
        Shortage: items['Sto.Location'] == 'LT01' ? (parseFloat(items['GRN qty']) * 20).toFixed(2) : 0,
        Unloading: UNLOADING,
        Transphipment: Transphipment,
        Diversion: Diversion,
        TransporterCompany: items['Transporter Name'],
        VehicleNumber: items['Vehicle No'],
        depot_code: this.SESSION_DATA['depot_code'],
        emp_id: this.SESSION_DATA['Emp_Id'],
        DriverName: "NA",
        DriverMobileNumber: "NA",
        reasonForDelay: "NA",
        Depot_Code: this.SESSION_DATA['depot_code'],
        BillingTimeOfPlant: ((items['Invoice Date'])),
        inTimeOfTruck: ((items['Arrival Time'])),
        outTimeOfTruck: ((items['GRN Time'])),
        ClearDateOfTruck: "NA",
        Month: storeDate.Month,
        Year: storeDate.Year,
        Emp_Id: session['Emp_Id'],
        HaltHour: haltHour,
        comments: "NA",
        Today: storeDate.DayOfWeek,
        fileId: this.STATIC_UNIQUE_ID + '_' + session['Emp_Id'],
        STO_LOCATION: items['STO_LOCATION'],
        deleteflag: items['deleteflag']
      }
    });
    this.IN_VALID_DATE = this.CHECK_IF_OLD_DATA_EXISTS();
  }

  ChangeTableDataDepotCode(event: any) {
    this.TableData.forEach((element: any) => {
      element['depot_code'] = event?.depot_code
      element['Depot_Code'] = event?.depot_code
    });
  }

  index: number = 0;
  response_msg: any = ''
  START_INDEX: number = 0;
  CLEAR_INTERVAL: any = null;
  batchSizes = [100, 200, 300, 400];
  selectedBatchSize = 100; // default value
  BATCH_LIMIT: number = 100;
  END_INDEX: number = this.BATCH_LIMIT;
  FILE_DETAILS: any = [];
  progress: number = 0
  uploadStart(progressbtn: any) {
    const FILE_Id = this.STATIC_UNIQUE_ID + '_' + this.SESSION_DATA['Emp_Id']
    this.service.FileUpload({
      id: FILE_Id,
      'Name': this.FILE_DETAILS?.name, Time: new Date(),
      Size: this.FILE_DETAILS?.size,
      TableName: 'Inward',
      EmpId: this.SESSION_DATA['Emp_Id'],
      DepotCode: this.SESSION_DATA['Depot_Code'],
      Date: moment(new Date()).format("YYYY-MM-DD")
    }).subscribe((fileres) => {
      this.UPLOAD_FILE_EXCEL(progressbtn, FILE_Id)
    });
  }

  UPLOAD_FILE_EXCEL(progressbtn: any, fileId: string) {
    // ✅ Guard clause for empty or undefined TableData
    if (!this.TableData || this.TableData.length === 0 || this.START_INDEX >= this.TableData.length) {
      console.warn('No data to upload.');
      return;
    }

    this.progress = 0;
    clearInterval(this.CLEAR_INTERVAL);

    const batchdata = this.TableData.slice(this.START_INDEX, this.END_INDEX);

    if (batchdata.length === 0) {
      console.warn('No batch data to process.');
      return;
    }

    const totalLength = this.TableData.length;
    const currentBatchLength = batchdata.length;

    this.service.InwardUploadNew(batchdata).subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.progress = 0;
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          if (event.total) {
            const chunkProgress = Math.round((event.loaded / event.total) * 100);
            const uploadedRecords = this.START_INDEX + (chunkProgress / 100) * currentBatchLength;
            this.progress = Math.round((uploadedRecords / totalLength) * 100);
          }
          break;
        case HttpEventType.Response:
          if (this.END_INDEX > this.TableData.length) {
            this.progress = 100;
            this.notifyService.showSuccess(event.body['response']['message'], "Success Insert Data");
            break;
          } else {
            setTimeout(() => {
              this.START_INDEX = this.END_INDEX;
              this.END_INDEX += this.BATCH_LIMIT;
              if (this.END_INDEX >= this.TableData.length) {
                this.END_INDEX = this.TableData.length;
              }
              this.UPLOAD_FILE_EXCEL(progressbtn, fileId);
            }, 10);
          }
      }
    });
  }

  onChangeEvent(event: any) {
    this.PAGE_INDEX = event?.pageIndex + 1;
    this.loadData();
  }

  gradeIndexOf(gradename: any) {
    for (let index = 0; index < this.GRADE_LIST_OBJECT.length; index++) {
      if (gradename.replace(' ', '').includes(this.GRADE_LIST_OBJECT[index])) {
        return this.GRADE_LIST_OBJECT[index];
      }
    }
  }

  uniqueID() {
    return Math.floor(Math.random() * Date.now())
  }

  setOneExtraDate(date: any) {
    let date_extra: any = new Date(date);
    date_extra.setDate(date_extra.getDate() + 1);
    return date_extra
  }

  CHECK_IF_OLD_DATA_EXISTS(): boolean {
    if (!this.TableData || this.TableData.length === 0) return false;

    const now = new Date();
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(now.getDate() - 5);

    return this.TableData.some((item: any) => {
      const entryDate = new Date(item.entry_date);
      return entryDate < fiveDaysAgo;
    });
  }
}
