import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../../../core/services/service.service';

@Component({
  selector: 'app-stock-report-page',
  templateUrl: './stock-report-page.component.html',
  styleUrl: './stock-report-page.component.scss'
})
export class StockReportPageComponent implements OnInit, OnDestroy {
  startDate = new Date();
  endDate = new Date();
  option = 'Ton';
  depotName = 'Tumkur';
  depotCode = 'A153';
  searchText: string = '';
  filteredDepots: string[] = [];
  depots = ['Tumkur', 'Hubli', 'Bangalore'];
  displayedColumns: string[] = [
    'entry_date',
    'sourceplant',
    'plantinvoice',
    'invoice_date',
    'arr_dt_truck',
    'invoiceqty',
    'grade',
    'goodstock'
  ];

  dataSource: any = [
    { srno: 1, entry_date: '2025-06-02', sourceplant: 'KADAPA', plantinvoice: '25020|3503', invoice_date: '2025-06-01', arr_dt_truck: '2025-06-02', invoiceqty: 3.0, grade: 'PPC', goodstock: 3.0 },
  ];

  constructor(public service: MainService) {
    service.TITLE_OF_PAGE = "This is Inward Report sheet : Select Options to navigate"
  }

  ngOnInit(): void {
    this.service.ALLDepotCode().then((res: any) => {
      console.log(res);
      this.depots = res?.data?.map((items: any) => items['depot_name'])
        this.filteredDepots = this.depots
    });
  }

   filterDepots() {
    const search = this.searchText.toLowerCase();
    this.filteredDepots = this.depots.filter(d => d.toLowerCase().includes(search));
  }
  
  applyFilter() {
    // Filter logic
    // data['Depot_Code'] = this.DEPOT_CODE[data['Depot_Name']];
    // $('.START_DATE').html("Selected Start Date is <br>" + data['Start_Date']);
    // $('.DEPOT_NAME').html("Selected Depot Name is <br>" + data['Depot_Name']);
    // $('.DEPOT_CODE').html("Selected Depot Code is <br>" + this.DEPOT_CODE[data['Depot_Name']]);
    // this.service.getStockTableData(data);
    // this.service.getNewStockTableData(data);
    // this.PreviewData.setData('StocksheetView_1', data);
  }

  ngOnDestroy(): void {
    this.service.TITLE_OF_PAGE = ''
  }
}
