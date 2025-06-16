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

@NgModule({
    declarations: [
        MatTableResuableComponent,
        PaginationComponent
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
        CoreModule
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
        MatProgressBarModule
    ],
    providers: [
        ModalService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
    ]
})
export class SharedModule { }
