import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [
    {
        path: "", component: LoginPageComponent, pathMatch: "full",
    },
     {
        path: "home", component: DashboardPageComponent, pathMatch: "full",
    },
    {
        path: "**", redirectTo: "",
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FeaturesRoutingModule { }
