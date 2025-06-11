import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesRoutingModule } from './features-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        LoginPageComponent,
        DashboardPageComponent
    ],
    imports: [
        BrowserModule,
        FeaturesRoutingModule,
        CommonModule
    ],
})
export class FeaturesModule { }
