import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InwardViewPageComponent } from './inward-view-page/inward-view-page.component';
import { InwardAddPageComponent } from './inward-add-page/inward-add-page.component';

const routes: Routes = [
    {
        path: "View", component: InwardViewPageComponent, data: {
            title: "This is Inward Report sheet : Select Options to navigate"
        }
    },
    {
        path: "Add", component: InwardAddPageComponent, data: {
            title: "This is Inward Entry Sheet"
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class InwardRoutingModule { }
