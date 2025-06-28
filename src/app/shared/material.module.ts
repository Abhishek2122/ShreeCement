import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Required for datepicker
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatCardModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatStepperModule,
  MatBadgeModule,
  MatTabsModule
];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}
