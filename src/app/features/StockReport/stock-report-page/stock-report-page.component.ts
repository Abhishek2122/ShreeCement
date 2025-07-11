import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/service.service';
import { FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-stock-report-page',
  templateUrl: './stock-report-page.component.html',
  styleUrl: './stock-report-page.component.scss'
})
export class StockReportPageComponent implements OnInit, OnDestroy {
  startDate = new Date();
  endDate = new Date();
  option = 'Ton';
  depotName = '';
  depotCode = '';
  searchText: string = '';
  filteredDepots: string[] = [];
  depots = ['Tumkur', 'Hubli', 'Bangalore'];
  displayedColumns: string[] = [
    'Entry Date',
    'Source Plant',
    'Plant Invoice',
    'Invoice Date',
    'Arr_DT_Truck',
    'Invoice Qty',
    'Grade',
    'Good Stock'
  ];

  displayColumnNewStock: string[] = [
    "Grade",
    "Opening Stock",
    "Total Received Today",
    "Total Sales Today",
    "Closing Stock",
  ]

  dataSourceStock: any = [];
  dataSourceNewStock: any = [];

  constructor(public service: MainService) {
    service.TITLE_OF_PAGE = "This is Inward Report sheet : Select Options to navigate"
  }

  ngOnInit(): void {
    this.service.ALLDepotCode().subscribe((res: any) => {
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

  filterDepots() {
    const search = this.searchText.toLowerCase();
    this.filteredDepots = this.depots.filter(d => d.toLowerCase().includes(search));
  }

  applyFilter(filterForm: FormGroup) {
    console.log(filterForm, "filterForm")
    this.service.getStockTableData({
      "Start_Date": moment(filterForm.value.startDate).format("YYYY-MM-DD"),
      "Depot_Name": filterForm.value.depotCode?.depot_name,
      "Depot_Code": filterForm?.value?.depotCode?.value
    }).then((res: any) => {
      const objKeys = Object.keys(res?.data?.OPENING_STOCK_LIST_GRADE || {});
      this.dataSourceNewStock = objKeys.map((element) => {
        const OPENING_STOCK_LIST_GRADE = res?.data?.OPENING_STOCK_LIST_GRADE[element];
        const RECIVED_TODAY_LIST_GRADE = res?.data?.RECIVED_TODAY_LIST_GRADE[element];
        const CLOSED_TODAY_LIST_GRADE = res?.data?.CLOSED_TODAY_LIST_GRADE[element];
        const CLOSED_STOCK_LIST_GRADE = res?.data?.CLOSED_STOCK_LIST_GRADE[element];
        return {
          Grade: element,
          'Opening Stock': this.service.ParseFloat(OPENING_STOCK_LIST_GRADE),
          'Total Received Today': this.service.ParseFloat(RECIVED_TODAY_LIST_GRADE),
          'Total Sales Today': this.service.ParseFloat(CLOSED_TODAY_LIST_GRADE),
          'Closing Stock': this.service.ParseFloat(CLOSED_STOCK_LIST_GRADE),
        };
      });
    });
    this.service.getNewStockTableData({
      "Start_Date": moment(filterForm.value.startDate).format("YYYY-MM-DD"),
      "Depot_Name": filterForm.value.depotCode?.depot_name,
      "Depot_Code": filterForm?.value?.depotCode?.value
    }).then((res: any) => {
      this.dataSourceStock = res?.data.map((item: any) => {
        return {
          'Entry Date': item?.entryDate,
          'Source Plant': item?.particulars,
          'Plant Invoice': item?.invoiceNumber,
          'Invoice Date': item?.invoiceDate,
          'Arr_DT_Truck': item?.entryDate,
          'Invoice Qty': item?.entryDate,
          'Grade': item?.entryDate,
          'Good Stock': item?.entryDate,
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.service.TITLE_OF_PAGE = ''
  }

  pageChanges(event: any) {
    console.log(event, "jkhjjhjjhk");
  }
}
