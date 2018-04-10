import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatCardModule,
  MatMenuModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatStepperModule,
  MatSortModule,
  MatAutocompleteModule,
  MatSnackBarModule,
} from '@angular/material';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatDialogModule,
} from "@angular/material/dialog";

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],

  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
})
export class MaterialModule { }
