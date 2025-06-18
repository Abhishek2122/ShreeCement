import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StockReportPageComponent } from './StockReport/stock-report-page/stock-report-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        LoginPageComponent,
        DashboardPageComponent,
        StockReportPageComponent
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
