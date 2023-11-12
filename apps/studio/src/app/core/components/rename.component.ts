import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'beever-rename',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Rename</h2>
    <mat-form-field class="px-4">
      <mat-label>Name</mat-label>
      <input matInput [(ngModel)]="name" placeholder="Name" value="Name" />
    </mat-form-field>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button color="primary" (click)="save()">Ok</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogContent,
  ],
})
export class BeeverRenameComponent {
  name = inject(MAT_DIALOG_DATA).name;
  dialogRef = inject(MatDialogRef);

  save(): void {
    this.dialogRef.close(this.name);
  }
}
