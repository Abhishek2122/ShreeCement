import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InwardRoutingModule } from './inward-routing.module';
import { InwardAddPageComponent } from './inward-add-page/inward-add-page.component';
import { InwardViewPageComponent } from './inward-view-page/inward-view-page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
      InwardAddPageComponent,
      InwardViewPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        InwardRoutingModule,
        SharedModule
    ]
})
export class InwardModule { }
