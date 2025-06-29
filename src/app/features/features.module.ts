import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StockReportPageComponent } from './StockReport/stock-report-page/stock-report-page.component';
import { SharedModule } from '../shared/shared.module';
import { FileUploadDetailsandDeletionComponent } from './file-upload-detailsand-deletion/file-upload-detailsand-deletion.component';
import { AdminControllerPanelComponent } from './Admin/admin-controller-panel/admin-controller-panel.component';
import { DepotDetailsPanelComponent } from './Admin/depot-details-panel/depot-details-panel.component';
import { EmployessPanelComponent } from './Admin/employess-panel/employess-panel.component';
import { GradeDetailsPanelComponent } from './Admin/grade-details-panel/grade-details-panel.component';
import { DamageReportInwardOutwardComponent } from './Report/damage-report-inward-outward/damage-report-inward-outward.component';
import { InwardReportComponent } from './Report/damage-report-inward-outward/inward-report/inward-report.component';
import { OutwardReportComponent } from './Report/damage-report-inward-outward/outward-report/outward-report.component';

@NgModule({
    declarations: [
        DashboardPageComponent,
        StockReportPageComponent,
        FileUploadDetailsandDeletionComponent,
        AdminControllerPanelComponent,
        DepotDetailsPanelComponent,
        EmployessPanelComponent,
        GradeDetailsPanelComponent,
        DamageReportInwardOutwardComponent,
        InwardReportComponent,
        OutwardReportComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FeaturesRoutingModule,
        SharedModule
    ],
    exports: [SharedModule]
})
export class FeaturesModule { }
