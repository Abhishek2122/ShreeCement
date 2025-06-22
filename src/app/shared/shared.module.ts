import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AvatarModule } from 'ngx-avatars';
import { ModalPopUpModule, ModalService } from 'modal-popup-angular-18';
import { MatTableResuableComponent } from './components/mat-table-resuable/mat-table-resuable.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CoreModule } from '../core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../core/interceptors/loader.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadUIComponent } from './components/upload-ui/upload-ui.component';
import { UploadUtilsUIModule } from 'upload-utils-ui';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
const antDesignIcons = AllIcons as {
    [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
    declarations: [
        MatTableResuableComponent,
        PaginationComponent,
        UploadUIComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        NgSelectModule,
        AvatarModule,
        ModalPopUpModule,
        MatProgressBarModule,
        CoreModule,
        UploadUtilsUIModule,
        NgZorroAntdModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        NgSelectModule,
        AvatarModule,
        ModalPopUpModule,
        MatTableResuableComponent,
        PaginationComponent,
        MatProgressBarModule,
        UploadUIComponent,
        UploadUtilsUIModule,
        NgZorroAntdModule
    ],
    providers: [
        ModalService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
        { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }
    ]
})
export class SharedModule { }
