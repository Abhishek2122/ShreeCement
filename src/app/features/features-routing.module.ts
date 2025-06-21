import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { StockReportPageComponent } from './StockReport/stock-report-page/stock-report-page.component';
import { FileUploadDetailsandDeletionComponent } from './file-upload-detailsand-deletion/file-upload-detailsand-deletion.component';

const routes: Routes = [
    {
        path: "", component: DashboardPageComponent,
        children: [
            { path: "Inward", loadChildren: () => import("./Inward/inward.module").then(m => m.InwardModule) },
            { path: "Outward", loadChildren: () => import("./Outward/outward.module").then(m => m.OutwardModule) },
            { path: "Upload", loadChildren: () => import("./upload/upload.module").then(m => m.UploadModule) },
            {
                path: "StockReport", component: StockReportPageComponent,
                data: {
                    title: "This is Stock Report sheet : Select Options to navigate"
                }
            },
            {
                path: "FileUploadDeletionPanel", component: FileUploadDetailsandDeletionComponent,
                data: {
                    title: "This is File Upload Sheet"
                }
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class FeaturesRoutingModule { }
