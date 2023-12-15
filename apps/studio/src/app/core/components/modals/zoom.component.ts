import { Component, inject } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'beever-zoom',
  standalone: true,
  imports: [CdkOverlayOrigin, MatButtonModule, MatIconModule],
  template: `
    <img class="w-full h-auto" [src]="data" alt="" />
    <button
      mat-mini-fab
      color="warn"
      class="!absolute top-2 right-2"
      (click)="dialogRef.close()"
    >
      <mat-icon svgIcon="close"></mat-icon>
    </button>
  `,
})
export class ZoomComponent {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
}
