import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutwardViewPageComponent } from './outward-view-page/outward-view-page.component';
import { OutwardAddPageComponent } from './outward-add-page/outward-add-page.component';

const routes: Routes = [
    {
        path: "View", component: OutwardViewPageComponent,
        data: {
            title: "This is Outward Report sheet : Select Options to navigate"
        }
    },
    {
        path: "Add", component: OutwardAddPageComponent,
        data: {
            title: "This is Outward Entry Sheet"
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class OutwardRoutingModule { }
