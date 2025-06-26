import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MainService } from '../../../core/services/service.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'custom-upload-ui',
  templateUrl: './upload-ui.component.html',
  styleUrl: './upload-ui.component.scss'
})
export class UploadUIComponent implements OnInit, OnDestroy {
  startDate = new Date();
  endDate = new Date();
  option = 'Ton';
  depotName = '';
  depotCode = '';
  searchText: string = '';
  filteredDepots: string[] = [];
  depots = ['Tumkur', 'Hubli', 'Bangalore'];
  @Input() TableColumns: string[] = [];
  @Input() TableData: any = [];
  @Output() eventCompleted: EventEmitter<any> = new EventEmitter();
  uploadUrl: string = ""
  constructor(public service: MainService) {
    this.uploadUrl = service.environment.NewBaseUrl + "common/upload-xlsx"
  }

  completed(event: any): void {
    this.eventCompleted.emit(event)
  }

  ngOnInit(): void {
  }

  filterDepots() {
    const search = this.searchText.toLowerCase();
    this.filteredDepots = this.depots.filter(d => d.toLowerCase().includes(search));
  }

  applyFilter(filterForm: FormGroup) {
    console.log(filterForm, "filterForm")
    // this.service.getStockTableData({
    //   "Start_Date": moment(filterForm.value.startDate).format("YYYY-MM-DD"),
    //   "Depot_Name": filterForm.value.depotCode?.depot_name,
    //   "Depot_Code": filterForm?.value?.depotCode?.value
    // }).then((res: any) => {
    //   const objKeys = Object.keys(res?.data?.OPENING_STOCK_LIST_GRADE || {});
    //   this.dataSourceNewStock = objKeys.map((element) => {
    //     const OPENING_STOCK_LIST_GRADE = res?.data?.OPENING_STOCK_LIST_GRADE[element];
    //     const RECIVED_TODAY_LIST_GRADE = res?.data?.RECIVED_TODAY_LIST_GRADE[element];
    //     const CLOSED_TODAY_LIST_GRADE = res?.data?.CLOSED_TODAY_LIST_GRADE[element];
    //     const CLOSED_STOCK_LIST_GRADE = res?.data?.CLOSED_STOCK_LIST_GRADE[element];
    //     return {
    //       Grade: element,
    //       'Opening Stock': this.service.ParseFloat(OPENING_STOCK_LIST_GRADE),
    //       'Total Received Today': this.service.ParseFloat(RECIVED_TODAY_LIST_GRADE),
    //       'Total Sales Today': this.service.ParseFloat(CLOSED_TODAY_LIST_GRADE),
    //       'Closing Stock': this.service.ParseFloat(CLOSED_STOCK_LIST_GRADE),
    //     };
    //   });
    // });
    // this.service.getNewStockTableData({
    //   "Start_Date": moment(filterForm.value.startDate).format("YYYY-MM-DD"),
    //   "Depot_Name": filterForm.value.depotCode?.depot_name,
    //   "Depot_Code": filterForm?.value?.depotCode?.value
    // }).then((res: any) => {
    //   this.dataSourceStock = res?.data.map((item: any) => {
    //     return {
    //       'Entry Date': item?.entryDate,
    //       'Source Plant': item?.particulars,
    //       'Plant Invoice': item?.invoiceNumber,
    //       'Invoice Date': item?.invoiceDate,
    //       'Arr_DT_Truck': item?.entryDate,
    //       'Invoice Qty': item?.entryDate,
    //       'Grade': item?.entryDate,
    //       'Good Stock': item?.entryDate,
    //     }
    //   })
    // });
  }

  ngOnDestroy(): void {
    this.service.TITLE_OF_PAGE = ''
  }

  pageChanges(event: any) {
    console.log(event, "jkhjjhjjhk");
  }
}
