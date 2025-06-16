import { NgModule } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { NotificationService } from './services/notification.service';
import { MainService } from './services/service.service';
import { ApiServiceService } from './services/api-service.service';
import { CookiesService } from './services/cookies.service';

@NgModule({
    imports: [
        
    ],
    providers: [
        LoaderService,
        NotificationService,
        MainService,
        ApiServiceService,
        CookiesService
    ],
})
export class CoreModule { }
