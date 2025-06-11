import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock-report-page',
  templateUrl: './stock-report-page.component.html',
  styleUrl: './stock-report-page.component.scss'
})
export class StockReportPageComponent {
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

  applyFilter() {
    // Filter logic
  }
}
