import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OutwardViewPageComponent } from './outward-view-page/outward-view-page.component';
import { OutwardAddPageComponent } from './outward-add-page/outward-add-page.component';
import { OutwardRoutingModule } from './outward-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
      OutwardViewPageComponent,
      OutwardAddPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        OutwardRoutingModule,
        SharedModule,
    ]
})
export class OutwardModule { }
