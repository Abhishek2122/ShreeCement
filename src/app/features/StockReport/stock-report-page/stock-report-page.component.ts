import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../../core/services/service.service';

@Component({
  selector: 'app-stock-report-page',
  templateUrl: './stock-report-page.component.html',
  styleUrl: './stock-report-page.component.scss'
})
export class StockReportPageComponent implements OnDestroy {
  startDate = new Date();
  endDate = new Date();
  option = 'Ton';
  depotName = 'Tumkur';
  depotCode = 'A153';

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

  constructor(public service: ServiceService) {
    service.TITLE_OF_PAGE = "This is Inward Report sheet : Select Options to navigate"
  }

  applyFilter() {
    // Filter logic
  }
  
  ngOnDestroy(): void {
    this.service.TITLE_OF_PAGE = ''
  }
}
