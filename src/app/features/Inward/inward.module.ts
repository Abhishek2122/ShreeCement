import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InwardRoutingModule } from './inward-routing.module';
import { InwardAddPageComponent } from './inward-add-page/inward-add-page.component';
import { InwardViewPageComponent } from './inward-view-page/inward-view-page.component';


@NgModule({
    declarations: [
      InwardAddPageComponent,
      InwardViewPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        InwardRoutingModule,
    ]
})
export class InwardModule { }
