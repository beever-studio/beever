import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScreenRecorderService } from '../services/screen-recorder.service';

@Component({
  selector: 'beever-banner-container',
  standalone: true,
  template: `
    <mat-list role="list">
      <mat-list-item role="listitem">
        <div class="flex justify-between items-center">
          <span>Item 1</span>
          <div>
            <button mat-icon-button (click)="show()">
              <mat-icon matListItemIcon svgIcon="visibility"></mat-icon>
            </button>
            <button mat-icon-button>
              <mat-icon matListItemIcon svgIcon="more_vert"></mat-icon>
            </button>
          </div>
        </div>
      </mat-list-item>
      <mat-list-item role="listitem">Item 2</mat-list-item>
      <mat-list-item role="listitem">Item 3</mat-list-item>
    </mat-list>
  `,
  imports: [MatListModule, MatButtonModule, MatIconModule],
})
export class BannerContainerComponent {
  screenRecorderService = inject(ScreenRecorderService);

  show(): void {
    this.screenRecorderService.setBanner(
      '<div style="background: red; color: white">Test</div>'
    );
  }
}
