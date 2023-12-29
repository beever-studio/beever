import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PreviewComponent } from '../../core/components/preview.component';
import { RecorderControlsComponent } from './recorder-controls.component';

@Component({
  selector: 'beever-recorder',
  standalone: true,
  template: `
    <header class="flex justify-between w-full p-4">
      <a routerLink="/" class="font-caveat text-4xl"> BEEVER </a>
      <button mat-raised-button color="primary" (click)="startRecording()">
        <mat-icon svgIcon="screen_record"></mat-icon>
        Record
      </button>
      <!--
          <button mat-raised-button>
            <mat-icon svgIcon="pause"></mat-icon>
          </button>
          <button mat-raised-button color="warn" (click)="stopRecording()">
            <mat-icon svgIcon="screen_record"></mat-icon>
            End Recording
          </button>
          <button mat-stroked-button (click)="downloadRecording()">
            <mat-icon svgIcon="download"></mat-icon>
            Download Recording
          </button>
          -->
    </header>
    <div class="flex flex-col items-center justify-center gap-4">
      <beever-preview></beever-preview>
      <beever-recorder-controls></beever-recorder-controls>
    </div>
  `,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    PreviewComponent,
    RecorderControlsComponent,
  ],
})
export default class RecorderComponent {
  constructor() {}

  startRecording() {
    console.log('start recording');
  }
}
